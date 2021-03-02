const itemControllers = require('./Controllers/itemControllers');
const authControllers = require('./Controllers/authControllers');
const addItem = itemControllers.addItem;
const getItems = itemControllers.getItems;
const registerUser = authControllers.registerUser;
const loginUser = authControllers.loginUser;
const getRegisteredUser = authControllers.getRegisteredUser;
const verifyToken = require('./verifyToken');

const path = require('path');

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
  });
  app.route('/content').get(verifyToken,(req,res)=>{
    res.sendFile(path.join(__dirname + '/verified.html'))
  })
  app.route("/auth/register").post(registerUser).get(getRegisteredUser);
  app.route("/auth/login").post(loginUser);
  app.route("/items").post(addItem).get(verifyToken,getItems);

};

module.exports = routes;

/*app.get('/items',getItems);
app.post('/items',addItem);*/
