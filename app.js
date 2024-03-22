const cors = require('cors');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const mysql = require('mysql');

const app = express();
const corsOption = {
	origin: 'http://localhost/',
	optionSuccessStatus: 200
}
app.use(cors()) // allows for cross origin resource sharingi

app.use(session({
    store: new FileStore(), //Tells the things that it should use the filesystem for storing shit
    secret: 'secretKey',    //Signs the session ID cookie
    resave: true,           //Forces the session to be saved back to the session store
    saveUninitialized: true //This is for new but not modifed sessions
}));

const connection = mysql.createConnection({
    host: 'localhost', // Dette er ::1 ikke 127 by default
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'ticket-system'
});
//testing connection
connection.connect((err) => {
	if (err) {
		console.error("conn error: ", err.stack);
	} else {
		console.log("conn success");
	}
});

app.get('/api/jeglever', (req, res) => {
	console.log("jeg lever og er tilgjengelig");
	res.send({message: "drep deg selv"});
});

app.post('/api/register', (req, res) => {
    console.log("Request to /api/register");
    console.log("sql insertion to: localhost:3306, ticket_system . user");
    connection.query(`INSERT INTO users (name, password, email) VALUES (
        ${connection.escape(req.body.name)}, //Ber om ting sendt fra form i html
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
            res.status(50).send({err: "something went wrong"});
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
// hefra er ticket tingene
app.get('/api/getAllTickets/', (req, res) => {
	console.log("request to /api/getAllTickets/");
	console.log("query til localhost:3306, ticket-system . ticket");
	connection.query(`SELECT * FROM ticket`, 
	function(err, result, fields) {
		if (err) {
			console.error(err);
			res.status(500).send({message: "sql"});
		} else {
			res.send(result);
			console.log(result);
		}
	});
});

app.get('/api/getTicket/', (req, res) => {

});

app.post('/api/createTicket/', (req, res) => {
	console.log("request to /api/createTicket");
	console.log("query til localhost:3306, ticket-system . ticket");
	connection.query(`INSERT INTO ticket (problem, user_id, status) VALUES (
		${req.body.problem}, 
		${req.session.id}, 
		${req.body.status}`,
	function(err, result, fields) {
		if (err) {
			console.error(err);
			res.status(500).send({err: "internal server error"});
		} else {
			console.log("ticket id: 	      ", row.id);
			console.log("user creating ticket id: ", row.user_id);
		}
	});			
});

const port = 3000;

app.listen(port, () => {
	console.log(`jeg lever på localhost:${3000}`);
});

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
