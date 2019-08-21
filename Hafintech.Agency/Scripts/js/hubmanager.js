(function (scope) {
    var hubmanager = function (_appLogic, callback) {
        self = this;
        appLogic = _appLogic;
        this.callback = callback
        this.ConnectHub();
    };
    var self, appLogic;
    hubmanager.prototype.ConnectHub = function () {
        this.Connection = $.hubConnection('http://socket.hafintech.com');
        this.appHub = this.Connection.createHubProxy('AppSocket');
        $.connection.hub.logging = true;
        this.Connection.stateChanged(function (change) {
            if (change.newState === $.signalR.connectionState.connecting) {
                console.log('Đang kết nối...');
            }
            else if (change.newState === $.signalR.connectionState.reconnecting) {
                console.log('Đang kết nối lại...');
            }
            else if (change.newState === $.signalR.connectionState.connected) {
                console.log('Kết nối thành công!');
            }
            else if (change.newState === $.signalR.connectionState.disconnected) {
                console.log('Mất kết nối...');
                UIController.showPopup("Có lỗi khi kết nối, mời bạn refesh lại trình duyệt", 30000);
            }
        });
        this.Connection.connectionSlow(function () {
            console.log('Connection Slow.');
        });

        this.Connection.error(function (error) {
            // Lỗi kết nối
            console.log("Connection Error");
        });
        this.Connection.reconnected(function () {
            console.log("Connection reconnected");
        });
        this.appHub.on('hqNotify', function (notifyCount, directionCount, customerRegisterount) {
            //console.log(notifyCount);
            //console.log(directionCount);
            //console.log(customerRegisterount);
        });
        this.appHub.on('kbNotify', function (notifyCount, directionCount, customerRegisterount) {
            var hdfnotifyCount = $('#hdfnotifyCount').val();
            var hdfdirectionCount = $('#hdfdirectionCount').val();
            if (hdfnotifyCount != notifyCount || hdfdirectionCount != directionCount)
            {
                $('#hdfnotifyCount,.spNotifyCount').val(notifyCount);
                $('#hdfdirectionCount,.spDirectionCount').val(directionCount);
                $('#spTotalNoti').html('(' + (notifyCount + directionCount) + ')')
                //if (hdfnotifyCount != notifyCount)
                //{
                    //bootbox.confirm("Có thông báo tổng hợp mới. Bạn có muốn về trang danh sách thông báo?!!", function (result) {
                    //    if (result == true) {
                    //        window.location = Config.Url_Root + "thong-bao-tong-hop";
                    //    }
                    //    else {
                           
                    //    }
                    //});
                //}
                //else
                //{
                    //bootbox.confirm("Có thông báo chỉ thị mới. Bạn có muốn về trang danh sách chỉ thị?!!", function (result) {
                    //    if (result == true) {
                    //        window.location = Config.Url_Root + "danh-sach-chi-thi-hai-quan";
                    //    }
                    //    else {
                           
                    //    }
                    //});
                //}
                var link = window.location.href;
                if (link.indexOf("thong-bao-tong-hop") || link.indexOf("danh-sach-chi-thi-hai-quan") || link.indexOf("danh-sach-to-khai") || link.indexOf("hang-sau-thong-quan"))
                {
                    console.log("notifyCount:" + notifyCount +" | directionCount:"+ directionCount);
                    searchData();
                }

            }
        });
        
        this.startHub();
    };
    hubmanager.prototype.startHub = function () {
        try {
            this.Connection.start({ waitForPageLoad: false, jsonp: true, transport: ['webSockets', 'serverSentEvents'] }).done(function () {
                self.callback(self.appHub);
            }).fail(function (e) {
                console.log(e);
                self.startHub();
            });
        } catch (e) {
        }
    };
    hubmanager.prototype.StopHubs = function () {
        try {
            this.Connection.stop();
        } catch (e) {
        }
    };

    hubmanager.prototype.GetHQNotify = function (accountID) {
        self.appHub.invoke('GetHQNotify').done(function () {

        }).fail(function (error) {
            console.log(error);
        });
    };
   
    scope.HubManager = hubmanager;
})(window)

function startHub() {
    this.hubManager = new HubManager(this, function (data) {
        console.log(data);
    });
}

$(document).ready(function () {
    startHub();
})