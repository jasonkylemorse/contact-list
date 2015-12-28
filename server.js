// file: server.js
// author: Jason Morse
// date: December 28, 2015

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']); // specify db and collection
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public')); // location of static files
app.use(bodyParser.json()); // allows server to parse body of the input it receives

// HTTP GET returns the database contents to the controller
app.get('/contactlist', function (req, res) {
	db.contactlist.find(function (err, docs) {
		res.json(docs);
	});
});

// HTTP POST inserts the new contact into the database and passes the updated contents to the controller
app.post('/contactlist', function (req, res) {
	db.contactlist.insert(req.body, function (err, doc) {
		res.json(doc);
	});
});

// HTTP DELETE removes record based on ObjectId, then passes the updated contents to the controller
app.delete('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

// upon edit request, an HTTP GET to a specific object address is performed, returning the one record to the controller 
app.get('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

// HTTP PUT updates record based on ObjectId and passes the updated contents to the controller
app.put('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)}, // select object to modify
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}}, new: true}, function (err, doc) {
			res.json(doc);
		});
});

app.listen(3000);
console.log('Server running on port 3000');