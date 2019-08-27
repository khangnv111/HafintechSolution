var PROTOCOL = 'ds-protocol';
var IP = '127.0.0.1';
var PORT = 2891;
var _ws = null;

var CMD = {
    VERSION: 0,
    SIGN_TXT: 1,
    SIGN_PDF: 2,
    GET_DCL: 3
};

var FORMAT = {
    BINARY: 0,
    HEXA: 1,
    BASE64: 2
};

var STATE = {
    FAIL: 0,
    SUCCESS: 1
}

if (typeof window != 'undefined')
    self = window;

self.nativeHostVersion = 1;

var KCrypto = new function () {
    this.hexa = function (byteArray) {
        return Array.from(byteArray, function (byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('')
    }

    this.HEXA = function (byteArray) {
        return this.hexa(byteArray).toUpperCase();
    }

    this.base64Encode = function (byteArray) {
        for (var i = 0; i < byteArray.length; i++) {
            //console.log('byte_' + i + ":" + byteArray[1]);
            console.log(byteArray);
        }
        return window.btoa(byteArray);
    }
}

function KBuffer(arr) {
    this._arr = arr || new Array();
    this._readPos = 0;
    this._writePos = 0;

    this.array = function () {
        return this._arr;
    }

    this.writeUint8 = function (v) {
        this._arr.push(v);
        this._writePos++;
    }

    this.readUint8 = function () {
        return this._arr[this._readPos++];
    }

    this.writeUint32 = function (v) {
        this._arr.push(v >> 24);
        this._arr.push(v >> 16);
        this._arr.push(v >> 8);
        this._arr.push(v);
        this._writePos += 4;
    }

    this.readUint32 = function () {
        var v = this._arr[this._readPos] << 24 |
            this._arr[this._readPos + 1] << 16 |
            this._arr[this._readPos + 2] << 8 |
            this._arr[this._readPos + 3];
        this._readPos += 4;
        return v;
    }

    this.read = function (length) {
        var data = this._arr.slice(this._readPos, this._readPos + length);
        this._readPos += length;
        return data;
    }

    this.write = function (arr) {
        this._arr = this._arr.concat(arr);
        this._writePos += arr.length;
    }
}

var KString = new function () {
    this.utf8Encode = function (str, arr) {
        for (var i = 0; i < str.length; i++) {
            var charcode = str.charCodeAt(i);
            if (charcode < 0x80) arr.push(charcode);
            else if (charcode < 0x800) {
                arr.push(0xc0 | (charcode >> 6),
                    0x80 | (charcode & 0x3f));
            }
            else if (charcode < 0xd800 || charcode >= 0xe000) {
                arr.push(0xe0 | (charcode >> 12),
                    0x80 | ((charcode >> 6) & 0x3f),
                    0x80 | (charcode & 0x3f));
            }
                // surrogate pair
            else {
                i++;
                // UTF-16 encodes 0x10000-0x10FFFF by
                // subtracting 0x10000 and splitting the
                // 20 bits of 0x0-0xFFFFF into two halves
                charcode = 0x10000 + (((charcode & 0x3ff) << 10)
                    | (str.charCodeAt(i) & 0x3ff))
                arr.push(0xf0 | (charcode >> 18),
                    0x80 | ((charcode >> 12) & 0x3f),
                    0x80 | ((charcode >> 6) & 0x3f),
                    0x80 | (charcode & 0x3f));
            }
        }
    }

    this.utf8Decode = function (input) {
		var i, str = '';
		if (!input)
			return str;

        for (i = 0; i < input.length; i++) {
            str += '%' + ('0' + input[i].toString(16)).slice(-2);
        }
        console.log("utf8Decode - str: ", str);
        str = decodeURIComponent(str); 
        return str;
    }
}

function WsMsg(_cmd, _state, _vData) {
    this.cmd = _cmd;
    this.state = _state;
    this.vData = _vData;
    this.serialize = function () {
        var buffer = new KBuffer();

        buffer.writeUint8(this.cmd);
        buffer.writeUint8(this.state);
        buffer.writeUint8(this.vData.length);
        for (var i = 0; i < this.vData.length; i++) {
            buffer.writeUint32(this.vData[i].length);
            buffer.write(this.vData[i]);
        }

        return buffer.array();
    }
}

var WsCppMessage = new function () {
    this.deserialize = function (array) {
        var buffer = new KBuffer(array);
        var cmd = buffer.readUint8();
        var state = buffer.readUint8();
        var dataSize = buffer.readUint8();
        var vData = [];
        for (var i = 0; i < dataSize; i++) {
            var size = buffer.readUint32();
            var data = buffer.read(size);
            vData.push(data);
        }

        return new WsMsg(cmd, state, vData);
    }
}

function sendWsJs(cmd, format, messages) {
    var vData = [];

    for (var i = 0; i < messages.length; i++) {
        var utf8Message = new Array();
        KString.utf8Encode(messages[i], utf8Message);
        vData.push(utf8Message);
    }

    var msg = new WsMsg(cmd, format, vData);
    var wsMessage = new Uint8Array(msg.serialize());
    _ws.send(wsMessage);
}

function receiveWsCpp(uint8Array) {
    var array = [].slice.call(uint8Array);

    var msg = WsCppMessage.deserialize(array);
    return msg;
}

// self.WebSocket = self.WebSocket || self.MozWebSocket;
// self.ws = new WebSocket('ws://' + IP + ':' + PORT, PROTOCOL);
// self.ws.binaryType = 'arraybuffer';

// if (typeof window == 'undefined') {
// self.ws.onmessage = function (msg) {
// receiveWsCpp(new Uint8Array(msg.data));

// self.postMessage(msg.data);
// };

// self.ws.onerror = function (evt) {
// self.postMessage({ 'state': 'error' });
// };

// self.ws.onopen = function (evt) {
// self.postMessage({ 'state': 'open' });
// };

// self.ws.onclose = function (evt) {
// self.postMessage({ 'state': 'close' });
// };

// self.onmessage = function (e) {
// var data = e.data;

// switch (data['cmd']) {
// case 1:
// sendWsJs(CMD.SIGN_TXT, FORMAT.HEXA, data['msg']);
// break;
// default:
// break;
// }
// };
//}