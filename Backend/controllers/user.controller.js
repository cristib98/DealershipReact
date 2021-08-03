const db = require('../models');
const User = db.user;
var bcrypt = require("bcryptjs");
const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};


exports.update = (req, res) => {
  const id = req.params.id;
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update the user with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating the User with id=" + id
      });
    });
};

exports.getOneUser = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then(data => {

      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id = " + id
      });
    });
};

exports.getOneUserId = (req, res) => {
  const id = req.body.id;
  User.findByPk(id)
    .then(data => {

      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id = " + id
      });
    });
};