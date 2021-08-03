const db = require('../models');
const FormComanda = db.formComanda;
const FormVanzare = db.formVanzare;

const Op = db.Sequelize.Op;

exports.viewForms = (req, res) => {

  FormComanda.findAll({})
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


exports.addForm = (req, res) => {
  const name = req.body.name;

  FormComanda.create({
    name: req.body.name,
    price: req.body.price,
    year: req.body.year,
    kms: req.body.kms,
    transmission: req.body.transmission,
    engine: req.body.engine,
    userId: req.body.userId
  }).then(() => {
    res.send({ message: `Form for ${name} added successfully!` })
  })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

exports.getOneRequest = (req, res) => {
  const id = req.params.id;

  FormComanda.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving form with id = " + id
      });
    });
};



exports.viewFormsVanzare = (req, res) => {
  FormVanzare.findAll({})
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


exports.addFormVanzare = (req, res) => {
  const name = req.body.name;

  FormVanzare.create({
    name: req.body.name,
    hp: req.body.hp,
    year: req.body.year,
    kms: req.body.kms,
    transmission: req.body.transmission,
    engine: req.body.engine,
    urlImage1: req.body.urlImage1,
    urlImage2: req.body.urlImage2,
    urlImage3: req.body.urlImage3,
    userId: req.body.userId
  }).then(() => {
    res.send({ message: `Form for ${name} added successfully!` })
  })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

exports.getOneRequestVanzare = (req, res) => {
  const id = req.params.id;

  FormVanzare.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving form with id = " + id
      });
    });
};

exports.deleteOneComanda = (req, res) => {
  const id = req.params.id;

  FormComanda.destroy ({
    where : { id : id }
  }).then(num => {
    if (num == 1) {
      res.send ({ message : "Deleted successfully!"});
    }
    else {
      res.send({message: `Cannot delete the form with the ID ${id}!`});
    }
  }).catch(err => {
    res.status(500).send({message: 'Sth. went wrong!'})
  })
}

exports.deleteOneVanzare = (req, res) => {
  const id = req.params.id;

  FormVanzare.destroy ({
    where : { id : id }
  }).then(num => {
    if (num == 1) {
      res.send ({ message : "Deleted successfully!"});
    }
    else {
      res.send({message: `Cannot delete the form with the ID ${id}!`});
    }
  }).catch(err => {
    res.status(500).send({message: 'Sth. went wrong!'})
  })
}