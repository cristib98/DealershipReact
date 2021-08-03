const { authJwt } = require("../middleware");
const userController = require("../controllers/user.controller");
const formController = require('../controllers/form.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

    app.post('/forms/add/request/', 
    formController.addForm);

    app.get('/forms',
    formController.viewForms);

    app.get("/forms/:id",
    formController.getOneRequest);

    app.post('/requests/sales/add/', 
    formController.addFormVanzare);

    app.get('/requests/sales',
    formController.viewFormsVanzare);

    app.get("/requests/sales/:id",
    formController.getOneRequestVanzare); 

    app.delete('/forms/:id', formController.deleteOneComanda);

    app.delete('/requests/:id', formController.deleteOneVanzare);




    

    
}