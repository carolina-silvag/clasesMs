'use strict'


function validarHeader(req) {
    console.log('Validar Header');

    var campo = "";
    var parametros = ["authorization", "codigosesion", "canal", "funcionalidad", "content-type", "etapa", "nombreaplicacion"];

    for (var i=0; i< parametros.length; i++) {
        if (req.headers[parametros[i]] == undefined || req.headers[parametros[i]] == "") {
            campo = parametros[i];
            break;
        }cd 
    }

    if (campo != "")
        logger.error("[MS Apertura de Cuentas Digitales] Header inválido: " + campo);

    return campo;
}

function validarBody(req, parametros) {
    logger.trace('Validar Body');

    var campo = "";
    var params = "params";

    if (req.body != null)
        params = "body";

    for (var i=0; i< parametros.length; i++) {
        if (req[params][parametros[i]] == undefined || req[params][parametros[i]] == "") {
            campo = parametros[i];
            break;
        }
    }

    if (campo != "")
        logger.error("[MS Apertura de Cuentas Digitales] Parámetro inválido: " + campo);

    return campo;
}

function validarParametros(req, parametros) {
    logger.trace('[MS Apertura de Cuentas Digitales] VALIDADOR: Parametros de Entrada');

    var header = validarHeader(req);
    var body = validarBody(req, parametros);

    if (header != "")
        return header + ", del header,";
    else if (body != "")
        return body;
    else
        return "";
}

module.exports = Object.assign({}, { validarParametros })
