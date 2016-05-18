var express = require("express");
var app = express();
var http = require("http").Server(app);

var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");

var url = "mongodb://localhost:27017/tasklist";

app.use(express.static('public'));

app.get("/", function(req, res){
	res.redirect("/public/index.html")
});

app.get("/api/get/lists", function(req, res){
	MongoClient.connect(url, function(err, db){
		assert.equal(null, err);
		console.log("Connected to mongo server");

		var lists = db.collection('tasks');
		lists.find({}).toArray(function(err, docs){
			assert.equal(null, err);
			res.json(docs);
			db.close();
		});
	})
})

http.listen(process.env.PORT || 3000, function(){
	console.log("Listening on port 3000")
})