module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phoneNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        birthDate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true
        }

    })

    return User
}