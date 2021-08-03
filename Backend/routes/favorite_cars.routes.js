const { authJwt } = require("../middleware");
const favCarsController = require("../controllers/favorite_cars.controller");
const db = require('../models')
const User = db.user
const Car = db.car


module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

    app.post('/addFavorite', 
    favCarsController.addFavorite);

    // app.get('/favorites/:id', 
    // favCarsController.getFavoriteCars);

    app.get('/favorites/:id', async (req, res, next) => {
        try {
          const u = await User.findByPk(req.params.id, {
            include: [Car]
          })
          if (u) {
            res.status(200).json(u.cars)
          } else {
            res.status(404).json({ message: 'not found ' })
          }
        } catch (err) {
          next(err)
        }
      })

}