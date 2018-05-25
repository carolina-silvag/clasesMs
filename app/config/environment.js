"use strict";

var config = {
    desarrollo: {
        MS_URL: process.env.MS_URL,
        MS_VERSION: process.env.MS_VERSION,
        MS_PUERTO_OCVT: process.env.MS_PUERTO_OCVT,
        MS_PUERTO_OSVT: process.env.MS_PUERTO_OSVT,
        ACTUALIZAR_IP: 'http://' + process.env.ACTUALIZAR_IP + ':' + process.env.ACTUALIZAR_PUERTO,
        ACTUALIZAR_VERSION: process.env.ACTUALIZAR_VERSION,
        ACTUALIZAR_DUMMY: process.env.ACTUALIZAR_DUMMY,
    },
    default: {
        MS_URL: '/servicios/aperturadecuentasdigitalesms/microservicios',
        MS_VERSION: 'v2',
        MS_PUERTO_OCVT: 3021,
        MS_PUERTO_OSVT: 3022,
        ACTUALIZAR_IP: 'http://192.168.228.3:5154',
        ACTUALIZAR_VERSION: 'v1.1',
        ACTUALIZAR_DUMMY: 'false'
    }
};

exports.get = function get(env) {
    return config[env] || config.default;
};
