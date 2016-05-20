var express = require("express");
var app = express();
var http = require("http").Server(app);

var bodyParser = require("body-parser");

var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;
var assert = require("assert");

var url = "mongodb://localhost:27017/tasklist";

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, }));

app.get("/", function(req, res){
	res.redirect("/public/index.html")
});

app.get("/api/get/lists", function(req, res){
	MongoClient.connect(url, function(err, db){
		assert.equal(null, err);
		console.log("Connected to mongo server to grab lists");

		var lists = db.collection('tasks');
		lists.find({}).toArray(function(err, docs){
			assert.equal(null, err);
			res.json(docs);
			db.close();
		});
	})
});

app.post("/api/post/newTask", bodyParser.json(), function(req, res){
	var objectToPush = {
		"text": req.body.text,
		"dueDate": req.body.dueDate,
		"done": false
	}
	MongoClient.connect(url, function(err, db){
		assert.equal(null, err);
		console.log("Connected to mongo server to add task");

		var objectID = new mongo.ObjectID(req.body.listID)
		db.collection("tasks").update(
			{_id: objectID},
			{
				$push: {
					"tasks": objectToPush
				}
			}
		)
	})
});

http.listen(process.env.PORT || 3000, function(){
	console.log("Listening on port 3000")
})