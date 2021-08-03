const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')

const app = express()

var corsOpt = {
    origin: 'http://localhost:8081'
}

app.use(cors(corsOpt))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))



const db = require('./models')
const Role = db.role
const Type = db.type

db.sequelize.sync()


// db.sequelize.sync({force: true}).then(() => {
//     console.log('Baza de date a fost stearsa si resincronizata!');
//     initial();
//   });

  
function initial() {
    Role.create({
        id: 1,
        name: "client"
    });

    Role.create({
        id: 2,
        name: "administrator"
    });


}

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/car.routes')(app);
require('./routes/form.routes')(app);
require('./routes/favorite_cars.routes')(app)

app.get('/', (req, res) => {
    res.json({ message: "Test" })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server-ul ruleaza pe portul ${PORT}`)
})

