const db = require('../models');
const FavoriteCar = db.favoriteCar;
const Op = db.Sequelize.Op;

exports.addFavorite = (req, res) => {
    FavoriteCar.create({
        carId: req.body.carId,
        userId: req.body.userId,
    }).then(() => {
        res.send({ message: `Car added successfully!` })
    })
        .catch(err => {
            res.status(500).send({ message: err.message })
        })
}

exports.getFavoriteCars = (req, res) => {

    const userId = req.params.id;
    var condition = userId ? { userId: { [Op.like]: `%${userId}%`} } : null;

    FavoriteCar.findAll({ where : condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Sth. went wrong"
        });
      });

}