module.exports = (sequelize, Sequelize) => {
  const FormComanda = sequelize.define("form_comanda", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    year: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    kms: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    transmission: {
      type: Sequelize.STRING,
      allowNull: false
    },
    engine: {
      type: Sequelize.STRING,
      allowNull: false
    }


  });

  return FormComanda;
};