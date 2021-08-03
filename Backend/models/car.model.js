module.exports = (sequelize, Sequelize) => {
    const Car = sequelize.define("car", {
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
        category: {
            type: Sequelize.STRING,
            allowNull: false
        },
        kms: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        engine: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cc: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        hp: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        transmission: {
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
        },
        features: {
            type: Sequelize.TEXT,
        }

    });

    return Car;
};