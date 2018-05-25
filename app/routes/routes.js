var nombreController = require('../controller/nombreController');
var postController = require('../controller/postController');

module.exports = function(app) {
    app.get('/servicios/microservicio/test/v1.0/nombre', nombreController.test);
    app.get('/servicios/microservicio/test/v1.0/test', testController.probandoTest);
    // microservicio, objeto, versión, acción(nombre)
    app.post('/servicios/microservicio/test/v1.0/postController', postController.test)
    
}


