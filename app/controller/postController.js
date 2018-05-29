const JSONValidation = require('json-validation').JSONValidation;
var js2xmlparser = require("js2xmlparser");
exports.test = function (req, res) {

    var schema = {
        type:'object',
        properties: {
            'key': {
                'type': 'string',
                'required': true
            },
            'key1': {
                'type': 'string'
            },
            'key2': {
                'type': 'string',
                'required': true
            },
            'key3': {
                'type': 'string',
                'required': true
            },
            'key4': {
                'type': 'string',
                'required': true
            },
            'key5': {
                'type': 'string',
                'required': true
            },      
            
        }

    }

    var jv = new JSONValidation();
    var resultBodyVal = jv.validate(req.body, schema);
    if(!resultBodyVal.ok) {
        console.info('resultBodyVal:' + resultBodyVal.errors.join(", ") + " at path" + resultBodyVal.path);
        return res.status(400).send({error:'Error de Validación'});
    }

    var prueba = req.query.hola
    console.log('ESTA ES LA PRUEBA FUNCIONA', prueba)
    var body = req.body;
    var header = req.headers;
    console.log(header);
    

    // var k = body.key;
    // var l = body.key1;
    // var m = body.key2;
    // var n = body.key3;
    // var p = body.key4;
    // var q = body.key5;
    
    
    var obj = {
    'nombre': 'pedrito',
    'edad': '30',
    'color': 'negro',
    'pais': 'chile',
    'ciudad': 'valparaiso'
    }


    // obj['comuna'] = k;
    obj['comunas'] = {};

    obj.comunas = body;

    // console.log(js2xmlparser.parse("person", obj));

    // obj.comunas['comuna1'] = l;
    // obj.comunas['comuna2'] = m;
    // obj.comunas['comuna3'] = n;
    // obj.comunas['comuna4'] = p;
    // obj.comunas['comuna5'] = q;
    
    var xml = js2xmlparser.parse("test", obj)
    console.log(xml);
    
    
    res.status(200).send(xml);
}


