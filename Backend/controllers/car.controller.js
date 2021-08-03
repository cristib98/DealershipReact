const { car } = require('../models');
const db = require('../models');
const Car = db.car;

const Op = db.Sequelize.Op;

exports.addCar = (req, res) => {
    const name = req.body.name;

    Car.create({
        name: req.body.name,
        price: req.body.price,
        year: req.body.year,
        category: req.body.category,
        kms: req.body.kms,
        engine: req.body.engine,
        cc: req.body.cc,
        hp: req.body.hp,
        transmission: req.body.transmission,
        urlImage1: req.body.urlImage1,
        urlImage2: req.body.urlImage2,
        urlImage3: req.body.urlImage3,
        urlImage4: req.body.urlImage4,
        urlImage5: req.body.urlImage5,
        urlImage6: req.body.urlImage6,
        urlImage7: req.body.urlImage7,
        features: req.body.features
    }).then(() => {
        res.send({ message: `${name} added successfully!` })
    })
        .catch(err => {
            res.status(500).send({ message: err.message })
        })
}

exports.addCarPage = (req, res) => {
    res.status(200).send("Add a car.");
};

exports.viewCars = (req, res) => {

    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%`} } : null;

    Car.findAll({ where : condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Sth. went wrong"
        });
      });
  };

exports.getOneCar = (req, res) => {
    const id = req.params.id;
  
    Car.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving car with id = " + id
        });
      });
  };

  exports.deleteOne = (req, res) => {
    const id = req.params.id;

    Car.destroy ({
      where : { id : id }
    }).then(num => {
      if (num == 1) {
        res.send ({ message : "Deleted successfully!"});
      }
      else {
        res.send({message: `Cannot delete the car with the ID ${id}!`});
      }
    }).catch(err => {
      res.status(500).send({message: 'Sth. went wrong!'})
    })
  }

  exports.update = (req, res) => {
    const id = req.params.id;
  
    Car.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Car updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update the car with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating the car with id=" + id
        });
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
  
    Car.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Datele masinii au fost modificate."
          });
        } else {
          res.send({
            message: `Nu s-au putut modifica datele pentru masina cu id-ul=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Eroare la modificarea masinii cu id=" + id
        });
      });
  };

