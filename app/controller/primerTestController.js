'use strict';

var soap = require("soap-client-bech");
var request = require('../modules/request');

const consultarTest = (req, res) => {
    console.log('[MS PRUEBA] CONTROLLER: Consultar Test');

    var params = request.getSoapParams();
    var soapBody = params.getSoapBody(req);    
    var soapHeader = params.getSoapHeader(req);
    var funcionWSDL = params.getFuncionWSDL();
    var url = params.getUrl();
    
    var prom = soap.strongSoapB9(url, soapHeader, soapBody, funcionWSDL);

    prom.then(function (resultado) {
        var responseSalida = res.status(200).send(resultado.result)
        return responseSalida;
    }).catch(function (e) {
        return res.status(500).send('error');
    });   
};

module.exports = Object.assign({}, { consultarTest })
