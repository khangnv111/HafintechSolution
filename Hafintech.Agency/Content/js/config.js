var Config = '';
if (window.location.href.indexOf("localhost") > 0) {
    Config = {
        Url_Root: 'http://localhost:62315/',
        API_Login: 'http://localhost:55619/'
    }
}
else if (window.location.href.indexOf("10.1.17.4") > 0) {
    Config = {
        Url_Root: 'http://10.1.17.4:8082/',
        API_Login: 'http://10.1.17.3:55619/'
    }
}
else if (window.location.href.indexOf("10.1.18.4") > 0) {
    Config = {
        Url_Root: 'http://10.1.18.4:8082/',
        API_Login: 'http://10.1.18.3:55619/'
    }
}
