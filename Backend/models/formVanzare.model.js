module.exports = (sequelize, Sequelize) => {
    const FormVanzare = sequelize.define("form_vanzare", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        hp: {
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
        },
        urlImage1: {
            type: Sequelize.STRING,
            allowNull: false
        },
        urlImage2: {
            type: Sequelize.STRING,
            allowNull: false
        },
        urlImage3: {
            type: Sequelize.STRING,
            allowNull: false
        }


    });

    return FormVanzare;
};