const express = require("express");
const path = require("path");
const mysql = require("mysql");
require('dotenv').config();
const methodOverride = require('method-override')



const app = express();


////ejs 
app.set('view engine' , 'ejs');


// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//override
////////////
app.use(methodOverride("_method"));


// Static
app.use(express.static(path.join(__dirname, 'public')));

// Mysql
const db = mysql.createConnection ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    multipleStatements: true
});

db.connect((err) => {
    if (err) { throw err;}
    console.log('Connecté à la base MySQL');
});

global.db = db;

//controllers
///////////////
const { getHomePage } = require("./controllers/getHomePage")
const { getSingleCar, getUpdateCars} = require("./controllers/getSingleCar")


app.get("/", getHomePage)

app.get("/cars/:id", getSingleCar)
app.get("/cars/update/:id", getUpdateCars)



app.listen(2000);
console.log('tourne sur le port 2000');
