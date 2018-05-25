'use strict';

const
    env = require('../configs/environment').get(process.env.NODE_ENV),
    seguridad = require('arquitecturaDigital/app/modules/moduloSeguridad'),
    validadorUtil = require('../utils/validador-util'),
    handlerMensaje = require('../utils/mensaje-handler');

const
    wsdlServicio = 'QryCustomerOperationAccount',
    wsdlPuerto = 'QryCustomerOperationAccount',
    wsdlOperacion = 'massiveSelectCustomerOperationRUT',
    wsdlVersion = env.ACTUALIZAR_VERSION.toLowerCase(),
    wsdlIp = env.ACTUALIZAR_IP,
    nombreArtefacto = "OperationRut",
    isDummy = env.ACTUALIZAR_DUMMY;

var service;

const actualizarTest = (req, res) => {
    console.log('[MS PRUEBA] CONTROLLER: Actualizar Test');

    var url = wsdlIp + '/services/' + wsdlServicio + '/' + wsdlVersion + '?WSDL';

    var mensaje = validadorUtil.validarParametros(req, []);

    req.headers.rutPersonaNatural = req.params.rutCliente;
    req.headers.digitoPersonaNatural =  req.params.dvCliente;

    if (mensaje == "") {
        if (isDummy == "false")
            service = require('../services/soap')
        else
            service = require('../services/dummy')

        service.ejecutarSolicitud(req, url, getCuerpoSolicitud(req), wsdlServicio, wsdlPuerto, wsdlOperacion, wsdlVersion, datosToken.idSesion, nombreArtefacto, (resultado, estado) => {
            res.status(estado).send(resultado);
        });
    } else {
        var resultado = handlerMensaje.getMensajeParametros(wsdlOperacion, mensaje);
        res.status(resultado.codigo).send(resultado);
    }
}

function getCuerpoSolicitud(req) {
    logger.debug(req);
    
    return {
        "customerIdentification": {
            "identificationNumber": req.params.rutCliente,
            "identificationComplement": req.params.dvCliente
        }
    };
}


module.exports = Object.assign({}, { actualizarTest })