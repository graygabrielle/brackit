const express = require("express");
const handlebars = require("express-handlebars");
const db = require("./app/models");
const routes = require("./app/controllers");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 1234;

//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//serves static versions of css & js so we can store as seperate files
app.use(express.static(path.join(__dirname + "app/public")));

//sets up handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//points app to routes
app.use(routes);

//syncs with sequelize/database and runs server
db.sequelize.sync({force: true}).then(function() {
    app.listen(PORT, function() {
        console.log(`App listening on http://localhost:${PORT}`)
    })
})