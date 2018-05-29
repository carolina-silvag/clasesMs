'use strict';

const logger = require('arquitecturadigital-bech').loggerBECH;

const ejecutarSolicitud = (req, url, cuerpoSolicitud, wsdlServicio, wsdlPuerto, wsdlOperacion, wsdlVersion, idSesion, nombreArtefacto, callback) => {
    logger.trace("[MS Apertura de Cuentas Digitales] SERVICE: DUMMY");

    var helper = require('../dummies/' + wsdlOperacion + 'Dummy');
    var respuesta = helper.getResult(req, wsdlOperacion, nombreArtefacto);

    callback(respuesta, respuesta.codigo);
}

module.exports = Object.assign({}, { ejecutarSolicitud })