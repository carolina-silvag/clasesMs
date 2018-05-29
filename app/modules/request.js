'use strict';

const getSoapParams = () => {
	var  funcionWSDL = function() {
    	return ['QryCustomerOperationAccount', 'QryCustomerOperationAccount', 'massiveSelectCustomerOperationRUT'];
	}

	var getUrl = function() {
    	return 'http://167.28.65.55:6106/services/QryCustomerOperationAccount/v1.1?WSDL'
	}

	var getHeader = function(req) {
		return {
		    "ServiceId": "massiveSelectCustomerOperationRUT",
		    "Type": "Request",
		    "ServiceVersion": "1.0",
		    "InstitutionType": "UNDEFINED",
		    "Locale": "es_CL",
		    "BranchId": "001",
		    "ChannelId": req.headers.canal,
		    "UserId": "uriTech=;uriSFB=7018976;userName=7018976;",
		    "Client": {
		        "UserAgent": "TW96aWxsYS81LjAgKFgxMTsgTGludXggeDg2XzY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvNTcuMC4yOTg3LjExMCBTYWZhcmkvNTM3LjM2",
		        "Address": "::1",
		        "SessionId": "prueba",
		        "UserId": "7018976",
		    }

		};
	}

	var getBody = function(req) {
		return {
		    "customerIdentification": {
		        "identificationComplement": req.params.dvClient,
		        "identificationNumber": req.params.rutClient
		    }
		};
	}

    return {     
        getSoapHeader: getHeader,
        getSoapBody: getBody,
        getFuncionWSDL: funcionWSDL,
        getUrl: getUrl
    }
}

module.exports = Object.assign({}, { getSoapParams })
