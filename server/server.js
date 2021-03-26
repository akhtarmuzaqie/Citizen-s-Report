const express = require('express'),
  mysql = require('mysql'),
  fs = require('fs'),
  app = express(),
  config = require('./config/config.json');

app.use(express.json()).use(express.urlencoded({extended: true}))
// Init Connection To Database
const db = mysql.createConnection(config);

db.connect((err)=> {
  if(err) {
    console.log(err)
  } else {
    console.log('Connected to database!')
  }
})

// Dynamic Route Import
getAllRoutes = () => {
  const routes = fs.readdirSync("./routes");
  routes.forEach((file) => {
    require(`./routes/${file}`)(app, db);
  });
};

app.listen(2121, () => console.log('Server Running at port 2121'));

(executor => {getAllRoutes()})()
