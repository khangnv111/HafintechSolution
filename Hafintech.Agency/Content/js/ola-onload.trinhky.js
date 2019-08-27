var linkDownload = Config.linkDownSign;
WebSocketConnect(IP, PORT, PROTOCOL);

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

                            var btDclId = null;
                            var btDclNo = null;
                            var status = app.statusTK;
                            if (status == 501 || status == 503 || status == 505) {
                                btDclId = app.data.btDclId;
                            } else if (status == 502 || status == 506 || status == 510) {
                                btDclNo = app.btDclNo.trim();
                            }
                            var signedData = {
                                "data": edi,
                                "signature": signData,
                                "publicKey": keyData,
                                "isSendFile": false,
                                "isSign": true,
                                "dclId": btDclId,
                                "dclNo": btDclNo,
                                "status": status
                            }
                            var xhttp = new XMLHttpRequest();
                            xhttp.withCredentials = true;
                            utils.Loading();
                            xhttp.onreadystatechange = function () {
                                if (this.readyState == 4 && this.status == 200) {
                                    debugger;
                                    utils.unLoading();
                                    var ress = JSON.parse(xhttp.responseText);
                                    console.log("ress: ", ress);
                                    if (ress.ResponseCode > 0) {
                                        bootbox.alert("Thành công!", function () {
                                            if (status == 501) {
                                                window.location.href = Config.Url_Root + "TransportDeclaration/ola?olaid=" + ress.Data.btDclId + "&ishight=7&tab=1"
                                            }
                                            else if (status == 502) {
                                                window.location.href = Config.Url_Root + "TransportDeclaration/ola?olaid=" + ress.Data.btDclId + "&ishight=7&tab=1"
                                            }
                                            else if (status == 503) {
                                                window.location.href = Config.Url_Root + "TransportDeclaration/olc?olaid=" + ress.Data.btDclId + "&ishight=7&tab=3"
                                            }
                                            else if (status == 506) {
                                                window.location.href = Config.Url_Root + "TransportDeclaration/olc?olaid=" + ress.Data.btDclId + "&ishight=7&tab=3"
                                            }
                                            else if (status == 505) {
                                                window.location.href = Config.Url_Root + "TransportDeclaration/cot?olaid=" + ress.Data.btDclId + "&ishight=7&tab=5"
                                            }
                                            else if (status == 510) {
                                                window.location.href = Config.Url_Root + "TransportDeclaration/itf?olaid=" + ress.Data.btDclId + "&ishight=7&tab=8"
                                            }
                                            else {
                                                location.reload();
                                            }

                                        });
                                    }
                                    //else if (ress.ResponseCode == -99) {
                                    //    bootbox.alert(ress.Data.Description);
                                    //}
                                    //else if (ress.ResponseCode == -100001) {
                                    //    bootbox.alert(ress.Description);
                                    //}
                                    //else if (ress.ResponseCode == -100) {
                                    //    bootbox.alert(ress.Description);
                                    //}
                                    else {
                                        if (ress.Data && ress.Data.object) {
                                            bootbox.alert("Mời bạn kiểm tra lại dữ liệu đã nhập");
                                            mess_GP.lstMess = ress.Data.object;
                                            mess_GP.forcusMess();
                                        }
                                        else {
                                            bootbox.alert(ress.Description);
                                        }
                                    }
                                }
                            };
                            xhttp.open("POST", Config.API_Login + "Agency/SendSignedData", true);
                            xhttp.setRequestHeader("content-type", "application/json");
                            xhttp.send(JSON.stringify(signedData));
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
    sendWsJs(CMD.SIGN_PDF, FORMAT.BINARY, ['Ký văn bản pdf', 'Hà nội']);
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
    $("#downSignkey").val(0);
    window.location.href = linkDownload;
}