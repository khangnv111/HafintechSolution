var Config = '';
if (window.location.href.indexOf("localhost") > 0) {
    Config = {
        Url_Root: 'http://localhost:64388/',
        API_Login: 'https://localhost:44360/'
    }
}
else if (window.location.href.indexOf("10.1.17.4") > 0) {
    Config = {
        Url_Root: 'http://10.1.17.4:64388/',
        API_Login: 'http://10.1.17.3:55619/'
    }
}
else if (window.location.href.indexOf("10.1.18.4") > 0) {
    Config = {
        Url_Root: 'http://10.1.18.4:64388/',
        API_Login: 'http://10.1.18.3:55619/'
    }
}
