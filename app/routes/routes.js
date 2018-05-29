var nombreController = require('../controller/nombreController');
var postController = require('../controller/postController');
var testController = require('../controller/testController');
var primerTestController = require('../controller/primerTestController')

module.exports = function(app) {
    app.get('/servicios/microservicio/test/v1.0/nombre', nombreController.test);
    // app.get('/servicios/microservicio/test/v1.0/test', testController.actualizarTest);
    app.get('/servicios/microservicios/test/v1.0/primerTest/:rutClient/:dvClient', primerTestController.consultarTest);
    // microservicio, objeto, versión, acción(nombre)
    app.post('/servicios/microservicio/test/v1.0/postController', postController.test)
    
}


