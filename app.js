const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const mysql = require('mysql');

const app = express();

app.use(session({
    store: new FileStore(), //Tells the things that it should use the filesystem for storing shit
    secret: 'secretKey',    //Signs the session ID cookie
    resave: true,           //Forces the session to be saved back to the session store
    saveUninitialized: true //This is for new but not modifed sessions
}));

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'ticket-system'
});

app.post('/api/register', (req, res) => {
    console.log("Request to /api/register");
    console.log("sql insertion to: localhost:3306, ticket_system . user");
    connection.query(`INSERT INTO users (name, password, email) VALUES (
        ${connection.escape(req.body.name)}, // Ber om ting sendt fra form i html
        ${connection.escape(req.body.password)},
        ${connection.escape(req.body.email)})`,
        function (err, result, fields) {
            if (err)
            {
                console.error(err)
                res.status(500).send({err: "brukernavn eller email allerede i bruk"})
            } else {
                res.status(200).send({message: "user created succesfully"})
                console.log("user created " + req.body.name)
            }
        });
});

app.post('/api/login', (req, res) => {
    console.log("request to /api/login");
    console.log("sql insertion to: localhost:3306, ticket-system . user");
    connection.query(`SELECT * FROM user WHERE name = ${connection.escape(req.body.name)} AND password = ${connection.escape(req.body.password)}`,
    function (err, result, fields) {
        if (err) {
            console.error(err);
            res.status(500).send({err: "something went wrong"});
        } else {
            for (let row of result) {
                console.log(row);
            }
            if (result.lenght > 0) {
                console.log(`${req.body.name} logged in!`);
                res.status(200).send({message: "loggin sucess!"});
                req.session.id
                req.session.name = req.body.name;
                console.log("session username is set")
            } else {
                console.error("feil brukernavn eller passord", err);
                res.status(401).send({err: "navn eller passord er feil"})
            }
        }
    });
});

app.post('/api/logout/', (req, res) => {
    console.log("request to /api/logout");
    req.session.destroy(
        function(err) {
            if (err) {
                console.error(err);
            } else {
                res.redirect('/');
            }
        }
    )
});


app.use(express.static('src'));

//                              //
// ⪻GODT Å VITE EXPRESS TING⪼ //
//                              //
//
//  
// req og res:  
//  req og res er objekter som representerer
//  http request of http respons
//  req:
//      req objektet representerer inkomende http requester
//      det har properties for query string, parameters, body, headers og mer
//  res:
//      res objektet representerer http responsen som express sender
//      når den har fått en request
//  
//  
//  
//  
//  
//  
//  
//  
//  
//  
//  
//  
//  
//  
//  