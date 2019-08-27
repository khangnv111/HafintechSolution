
var Trinhky = function (callback) {
    var linkDownload = Config.linkDownSign;
    this.callback = callback;
    function init() {
        WebSocketConnect(IP, PORT, PROTOCOL);
    }
    function WebSocketConnect(ip, port, protocol) {
        if ("WebSocket" in window) {
            _ws = new WebSocket('ws://' + ip + ':' + port, protocol);
            _ws.binaryType = 'arraybuffer';

            _ws.onopen = function () {
                console.log('WS connected to' + ' ' + ip + ':' + port);
                //document.getElementById('btnSign').disabled = false; 
            };

            _ws.onmessage = function (msg) {
                console.log("onmessage");
                console.log("msg: " + msg.data);
                var wscpp = receiveWsCpp(new Uint8Array(msg.data));
                console.log("wscpp: " + wscpp);
                console.log("wscpp.cmd: " + wscpp.cmd);
                switch (wscpp.cmd) {
                    case CMD.VERSION: {
                        var data = JSON.parse(KString.utf8Decode(wscpp.vData[0]));
                        var version = data['version'];
                        console.log('client: ' + version + '\nserver: ' + window.nativeHostVersion);

                        if (version < window.nativeHostVersion) {
                            //alert('Yêu cầu cập nhật phiên bản "Chữ ký số" mới.');
                            $("#downSignkey").val(1);
                            var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
                            var day = currentDate.getDate();
                            var month = currentDate.getMonth() + 1;
                            var year = currentDate.getFullYear();
                            var dateString = day + "-" + month + "-" + year;
                            utils.SetCookie("signMethod", "0", dateString);
                        }
                    }
                        break;
                    case CMD.SIGN_TXT:
                        //debugger;
                        if (wscpp.state == STATE.SUCCESS) {
                            if (wscpp.vData.length >= 2) {
                                console.log('SUCCESS');
                                var signData = KString.utf8Decode(wscpp.vData[0]);
                                var keyData = KString.utf8Decode(wscpp.vData[1]);
                                var edi = KString.utf8Decode(wscpp.vData[2]);
                                if (callback) callback(edi, signData, keyData);
                            }
                        } else {
                            console.log('fail');
                            bootbox.alert("Có lỗi xảy ra");
                        }
                        break;
                    case CMD.SIGN_PDF:
                        if (wscpp.state == STATE.SUCCESS) {
                            var directory = KString.utf8Decode(wscpp.vData[0]);
                            var fileSigned = KString.utf8Decode(wscpp.vData[1]);

                            console.log(directory + '\\' + fileSigned);
                        } else {
                            var error = KString.utf8Decode(wscpp.vData[0])
                            alert(error);
                        }
                        break;
                }
            };

            _ws.onclose = function () {
                console.log("onclose");
                //document.getElementById('btnSign').disabled = true;

            };

            _ws.onerror = function () {
                console.log("onerror");
                $("#downSignkey").val(1);
                var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
                var day = currentDate.getDate();
                var month = currentDate.getMonth() + 1;
                var year = currentDate.getFullYear();
                var dateString = day + "-" + month + "-" + year;
                utils.SetCookie("signMethod", "0", dateString);

            };

        } else {
            bootbox.alert("WebSocket NOT supported by your Browser!");
        }
    }

    function addMessage(msg) {
        console.log(msg);
    }

    function signText() {
        document.getElementById('txtDataSigned').value = '';
        document.getElementById('txtPublicKey').value = '';
        document.getElementById("txtMessage").value = '';
        document.getElementById("txtResult").value = '';

        var dclId = document.getElementById('txtDclId').value;
        var dclType = document.getElementById('dclType').value;
        console.log('dclId: ' + dclId);
        console.log('dclType: ' + dclType);
        //sendWsJs(CMD.GET_DCL, FORMAT.BINARY, [dclId, dclType]);

        var data = {
            "dclId": dclId,
            "status": dclType
        }
        var xhttp = new XMLHttpRequest();
        xhttp.withCredentials = true;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var jsonObj = JSON.parse(xhttp.responseText);
                if (jsonObj["ResponseCode"] >= 0) {
                    var ediStr = jsonObj["Data"].replace('"', '');
                    document.getElementById("txtMessage").value = ediStr;
                    sendWsJs(CMD.SIGN_TXT, FORMAT.BINARY, [ediStr]);
                }
                else {
                    document.getElementById("txtMessage").value = xhttp.responseText;
                }
            }
        };
        xhttp.open("POST", Config.API_Login + "Agency/GetEdiToSign", true);
        xhttp.setRequestHeader("content-type", "application/json");
        xhttp.send(JSON.stringify(data));
    }

    function signPdf() {
        this.sendWsJs(CMD.SIGN_PDF, FORMAT.BINARY, ['Ký văn bản pdf', 'Hà nội']);
    }

    this.sendWsJs = function (cmd, format, messages) {
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

    function getDcl() {
        var dclId = document.getElementById('txtDclId').value;
        var dclType = document.getElementById('dclType').value;
        console.log('dclId: ' + dclId);
        console.log('dclType: ' + dclType);
        //sendWsJs(CMD.GET_DCL, FORMAT.BINARY, [dclId, dclType]);

        var message = document.getElementById('txtMessage').value;
        var data = {
            "dclId": dclId,
            "status": dclType
        }
        var xhttp = new XMLHttpRequest();
        xhttp.withCredentials = true;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                console.log('responseText: ' + xhttp.responseText);
                document.getElementById("txtMessage").innerHTML = xhttp.responseText;
            }
        };
        xhttp.open("POST", "http://10.17.3:55619/Agency/GetEdiToSign", true);
        xhttp.setRequestHeader("content-type", "application/json");
        xhttp.send(JSON.stringify(data));
    }

    function testBase64() {
        var msg = document.getElementById('txtMessage').value;
        var base64Out = KCrypto.base64Encode(msg);
        document.getElementById('txtDataSigned').value = base64Out;
    }


    function downTK() {
        window.location.href = linkDownload;
    }
    init();
}
function downTK() {
    window.location.href = Config.linkDownSign;
}