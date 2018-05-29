'use strict';
var soap = require("soap-client-bech");
console.log('aquiiiiiiiiiiiii', soap)

exports.consultarTest = function (req, res) {
   console.log('[MS PRUEBA] CONTROLLER: Actualizar Test');

    var soapBody = getBody();
    console.log('body', soapBody)     
    var soapHeader = getHeader();
    console.log('headers', soapHeader)
    var funcionWSDL = getFuncionWSDL();
    console.log('funcion WSDL', funcionWSDL)
    var url = getUrl();
    console.log('url', url)
    
    var prom = soap.strongSoapB9(url, soapHeader, soapBody, funcionWSDL);
    console.log('promesas', prom)

    prom.then(function (resultado) {
        var responseSalida = res.status(200).send(resultado.result)
        return responseSalida;
    }).catch(function (e) {
    
        return res.status(500).send('error');
    });   
};

function  getFuncionWSDL() {
    return ['QryCustomerOperationAccount', 'QryCustomerOperationAccount', 'massiveSelectCustomerOperationRUT'];
}

function getUrl(req) {
    return 'http://167.28.65.55:6106/services/QryCustomerOperationAccount/v1.1?WSDL'
}

function getHeader(req) {
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

function getBody(req) {
    
    return {
        "customerIdentification": {
            "identificationComplement": req.params.dvClient,
            "identificationNumber": req.params.rutClient
        }
    };
}
