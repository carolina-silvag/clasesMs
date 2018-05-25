'use strict';

const
    { soapClientModule } = require('soap-client-bech'),
    moment = require('moment'),
    env = require('../configs/environment').get(process.env.NODE_ENV),
    utilDatalake = require('../utils/datalake-util'),
    logger = require('arquitecturadigital-bech').loggerBECH,
    handlerMensaje = require('../utils/mensaje-handler');

var MensajeSalida = require('arquitecturaDigital/app/models/mensajeSalida'),
    MensajeError = require('../models/mensaje-error'),
    soapClient = new soapClientModule();

const formatDate = 'YYYYMMDDhhmmssSSS'

const ejecutarSolicitud = (req, url, cuerpoSolicitud, wsdlServicio, wsdlPuerto, wsdlOperacion, wsdlVersion, idSesion, nombreArtefacto, callback) => {
    logger.trace("[MS Apertura de Cuentas Digitales] SERVICE: SOAP");
    logger.debug("URL = " + url);

    var respuesta;
    var fechaInicio = new Date().toISOString();
    var options = { timeout: parseInt(env.TIMEOUT) };
    var funcionWSDL = [wsdlServicio, wsdlPuerto, wsdlOperacion];
    var cabeceraSolicitud = getCabeceraSolicitud(req, wsdlOperacion, idSesion);
    logger.debug(cabeceraSolicitud);

    var request = {
        header: cabeceraSolicitud,
        body: cuerpoSolicitud
    }

    soapClient.busSoapCall(url, options, request, funcionWSDL)
        .then(resultado => {
            logger.info("[MS Apertura de Cuentas Digitales] Ejecución exitosa");
            logger.debug("Resultado de solicitud: \n" + JSON.stringify(resultado));
            
            var helper = require('../helpers/' + wsdlOperacion + 'Helper');
            var newResult = helper.getObject(resultado.result, wsdlOperacion);
            
            respuesta = handlerMensaje.construirMensajeSalida(newResult, wsdlOperacion);
            logger.debug("Mensaje de salida: \n" + JSON.stringify(respuesta));

            utilDatalake.log(req, wsdlOperacion, resultado, respuesta.codigo, fechaInicio, nombreArtefacto);
            callback(respuesta, respuesta.codigo);
        }).catch(error => {
            logger.error('[MS Apertura de Cuentas Digitales] Error en la ejecucion');
            logger.debug("Resultado de solicitud: \n" + JSON.stringify(error));

            respuesta = handlerMensaje.construirMensajeSalida(error.root.Envelope.Body.Fault, wsdlOperacion);
            logger.debug("Mensaje de salida: \n" + JSON.stringify(respuesta));

            utilDatalake.log(req, wsdlOperacion, error, respuesta.codigo, fechaInicio, nombreArtefacto);
            callback(respuesta, respuesta.codigo);
        }
        );
}

function getCabeceraSolicitud(req, wsdlOperacion, idSesion) {
    logger.trace("[MS Apertura de Cuentas Digitales] Obtener Cabecera de la Solicitud");

    var rutCliente = (req.params != undefined ? req.params.rutCliente : req.body.rutCliente)

    return {
        ServiceId: wsdlOperacion,
        Type: 'Request',
        InstitutionType: 'BECH',
        FeatureId: req.headers.funcionalidad,
        ChannelId: req.headers.canal,
        BranchId: '443', //?????
        TerminalId: '4546', //?????
        TimeStamp: moment().format(formatDate),
        ErrorCode: '',
        ReasonCode: '',
        Audit: '',
        TraceLevel: '',
        Token: '',
        ExceptionTopic: '',
        Client: {
            UserAgent: new Buffer(req.headers['user-agent']).toString('base64'),
            Address: req.connection.remoteAddress,
            SessionId: idSesion,
            UserId: rutCliente
        }
    };
}

module.exports = Object.assign({}, { ejecutarSolicitud })
