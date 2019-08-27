var Config = ''; 

if (window.location.href.indexOf("localhost") > 0) {
    Config = {
        Url_Root: 'http://localhost:62315/',
        API_Login: 'http://localhost:55619/',
		linkDownSign: 'http://10.1.17.4:8080/DS_Setup.exe', //link download trình ký
        ApiEVoucher: 'http://10.1.17.3:8090/MediationVouchers/api/',
		Message: 'http://10.1.17.3:8090/', 
    }
}
else if (window.location.href.indexOf("10.1.17.4") > 0) {
    Config = {
        Url_Root: 'http://10.1.17.4:8082/',
		API_Login: 'http://10.1.17.3:55619/',
		linkDownSign: 'http://10.1.17.4:8080/DS_Setup.exe',
        ApiEVoucher: 'http://10.1.17.3:8090/MediationVouchers/api/',
        Message: 'http://10.1.17.3:8090/',
    }
}
else if (window.location.href.indexOf("10.1.18.4") > 0) {
    Config = {
        Url_Root: 'http://10.1.18.4:8082/',
        API_Login: 'http://10.1.18.3:55619/',
		linkDownSign: 'http://10.1.17.4:8080/DS_Setup.exe',
        ApiEVoucher: 'http://10.1.17.3:8090/MediationVouchers/api/',
        Message: 'http://10.1.18.3:8090/',
    }
}
else if (window.location.href.indexOf("10.1.20.2") > 0) {
    Config = {
        Url_Root: 'http://10.1.20.2:8084/',
        API_Login: 'http://10.1.20.2:8082/',
        linkDownSign: 'http://10.1.20.2:8080/DS_Setup.exe',
        ApiEVoucher: 'http://10.1.20.2:8081/MediationVouchers/api/',
        Message: 'http://10.1.19.5:8090/',
    }
}
else if (window.location.href.indexOf("agency.hafintech.com") > 0) {
	Config = {
		Url_Root: 'http://agency.hafintech.com/',
		API_Login: 'http://hafintech_api.hafintech.com/',
		linkDownSign: 'http://ds.hafintech.com/',
		ApiEVoucher: 'http://evoucher_api.hafintech.com/',
		Message: 'http://10.1.19.5:8090/',
	}
}

