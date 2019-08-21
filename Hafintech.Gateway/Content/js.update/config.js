var Config = '';
if (window.location.href.indexOf("localhost") >= 0) {
    Config = {
        Url_Root: 'https://localhost:44382/',
        API_Login: 'http://localhost:55619/',
        Message: 'http://10.1.17.3:8090/',
    }
}
else if (window.location.href.indexOf("10.1.17.4") >= 0) {
    Config = {
        Url_Root: 'http://10.1.17.4:64382/',
        API_Login: 'http://10.1.17.3:55619/',
        Message: 'http://10.1.17.3:8090/',
    }
}
else if (window.location.href.indexOf("10.1.18.4") >= 0) {
    Config = {
        Url_Root: 'http://10.1.18.4:64382/',
        API_Login: 'http://10.1.18.3:55619/',
        Message: 'http://10.1.18.3:8090/',
    }
}
