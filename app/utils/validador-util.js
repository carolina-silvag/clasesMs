
exports.getSoapPagoParams = function () {

    var  getFuncionWSDL = function() {
    		return ['QryCustomerOperationAccount', 'QryCustomerOperationAccount', 'massiveSelectCustomerOperationRUT'];
		}

		var getUrl = function(req) {
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
		        "ChannelId": "HB",
		        "UserId": "uriTech=;uriSFB=7018976;userName=7018976;",
		        "Client": {
		            "UserAgent": "TW96aWxsYS81LjAgKFgxMTsgTGludXggeDg2XzY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvNTcuMC4yOTg3LjExMCBTYWZhcmkvNTM3LjM2",
		            "Address": "::1",
		            "SessionId": "prueba",
		            "UserId": "7018976",
		        }

			};
		}

		var getBody = function() {
    
		    return {
		        "customerIdentification": {
		            "identificationComplement": '4',
		            "identificationNumber": '14049078'
		        }
		    };
		}

    return {
        
        getHeader: getHeader,
        getBody: getBody,
        getFuncionWSDL: funcionWSDL,
        getUrl: getUrl
    }
}
