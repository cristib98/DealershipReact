const config = require("../config/db.config.js")

const Sequelize = require("sequelize")
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: 0
    }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.role = require('../models/role.model.js')(sequelize, Sequelize);
db.car = require('../models/car.model.js')(sequelize, Sequelize);
db.formComanda = require('./formComanda.model.js')(sequelize, Sequelize);
db.formVanzare = require('./formVanzare.model')(sequelize, Sequelize);
// db.type = require('../models/type.model.js')(sequelize, Sequelize);
db.quiz = require('../models/quiz.model.js')(sequelize, Sequelize);
db.result = require('../models/result.model.js')(sequelize, Sequelize);
db.favoriteCar = require('../models/favorite_cars.js')(sequelize, Sequelize);
// db.form.hasOne(db.type)

db.user.hasMany(db.quiz);
db.quiz.hasOne(db.result);

db.user.hasMany(db.formComanda)
db.user.hasMany(db.formVanzare)

// db.type.belongsToMany(db.form, {
//     through: 'form_types',
//     foreignKey: 'typeId',
//     otherKey: 'formId'
// })

// db.user.hasMany(db.form);


db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.role = require('../models/role.model.js')(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: 'user_roles',
    foreignKey: 'userId',
    otherKey:'roleId'
})

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
})

db.car.belongsToMany(db.user, {
    through: db.favoriteCar,
    foreignKey: "userId",
    otherKey: "carId"
})

db.user.belongsToMany(db.car, {
    through: db.favoriteCar,
    foreignKey: "userId",
    otherKey: "carId"
})

db.ROLES = ["client","administrator"]

module.exports = db