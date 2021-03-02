const express = require("express");
const app = express();
/*const cors = require("cors");
app.use(cors);*/
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,x-json-web-token");
  next();
});

const routes = require("./routes");
routes(app);

const mongoose = require("mongoose");

const http = require("http");

const hostname = "127.0.0.1";
const port = 4000;

mongoose.connect("mongodb://127.0.0.1:27017/itemDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/*const basicWebServer = http.createServer((req, res) => {
   res.writeHead(200, {'Content-Type': 'text/html'});
   res.send('<h1>Hello World!</h1><h2>Item List</h2><ul><li style=”color: red”>Item 1</li></ul><h2>Add Item</h2><form><label for=”item”>Item: </label><input type=”text”></br><input type=”submit” value=”Submit”></form>');
});
basicWebServer.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
});*/

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
