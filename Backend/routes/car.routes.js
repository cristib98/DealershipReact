const { authJwt } = require("../middleware");
const userController = require("../controllers/user.controller");
const carController = require('../controllers/car.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

    app.post('/add-car', 
    // [authJwt.verifyToken, authJwt.isAdmin],
    carController.addCar);

    app.get('/add-car', 
    [authJwt.verifyToken, authJwt.isAdmin],
    carController.addCarPage);

    app.get('/inventory',
    carController.viewCars);

    app.get('/inventory/car/:id',
    carController.getOneCar);

    app.delete('/inventory/car/:id', carController.deleteOne);

    app.put('/inventory/car/:id',
    carController.update);


    
}