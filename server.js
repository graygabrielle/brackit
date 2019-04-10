const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");
const db = require("./app/models");
const routes = require("./app/controllers");

const PORT = process.env.PORT || 1234;

//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//serves static versions of css & js so we can store as seperate files
app.use(express.static(path.join(__dirname, "app/public")));

//sets up handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main"}));
app.set("view engine", "handlebars");
//sets view folder for handlebars
app.set("views", path.join(__dirname, "app/views"));

//sets view folder for handlebars
app.set("views", path.join(__dirname, "app/views"));

//points app to routes
app.use(routes);

// io.on("connection", function(socket) {
//     console.log("User connected to socket.");
//     socket.on("disconnect", function() {
//         console.log("A user has disconnected.");
//     })
// })

//syncs with sequelize/database and runs server
db.sequelize.sync({force: true}).then(function() {
    http.listen(PORT, function() {
        console.log(`App listening on http://localhost:${PORT}`)
    })
})