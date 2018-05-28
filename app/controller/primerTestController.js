'use strict';
var soap = require("soap-client-bech");
exports.consultarTest = function (req, res) {
   console.log('[MS PRUEBA] CONTROLLER: Actualizar Test');

    var soapBody = getBody();     
    var soapHeader = getHeader();
    var funcionWSDL = getFuncionWSDL();
    var url = getUrl();
    var prom = soap.strongSoapB9(url, soapHeader, soapBody, funcionWSDL);
    console.log(prom)

    prom.then(function (resultado) {
        var responseSalida = res.status(200).send(resultado)
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
            "identificationComplement": req.params.dvCliente,
            "identificationNumber": req.params.rutCliente
        }
    };
}
