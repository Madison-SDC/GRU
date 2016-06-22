/* HTTP Server */

express = require('express')
  , http = require('http')
  , port = 8080
  , app = express()
  , bodyParser = require('body-parser')
  , server = http.createServer(app).listen(port, 'localhost', function() {
    console.log('Server listening on ' + port);
  });

/* Database Connection */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'sfhacker',
    password : 'sfhacker',
    database : 'sfhackday'
});

/* Everything is fine if err is not set */
connection.connect(function(err){
    if (!err) console.log("Database is connected ... nn");
    else console.log("Error connecting database ... nn");
});

/* Web Host */
app.use('/', express.static(__dirname + '/../client/'));
app.use(bodyParser.json());

/* Handling Get Requests API Section */

// Get All

app.get('/get-categories', function(req, res) {
  connection.query('SELECT * FROM `sfhackday`.`CATEGORIES`;', function(err, results) {
    //console.log(results);
    res.send({'categories':results});
  });
});

app.get('/get-users', function(req, res) {
  connection.query('SELECT * FROM `sfhackday`.`USER` ORDER BY `Points` DESC LIMIT 50;', function(err, results) {
    console.log("Loading leaderboard.");
    res.send({ 'users': results });
  });
});

app.get('/get-user-threads/:alias', function(req, res) {
  var alias = req.params.alias;
  console.log("Loading " + alias + "'s page.");
  var statement = 'SELECT * FROM `sfhackday`.`THREAD` WHERE `User_ID` LIKE ("' + alias + '");';
  connection.query(statement, function(err, results) {
    res.send({'threads': results});
  });
});

// End Get All

// Get By Id

app.get('/get-category/:id', function(req, res) {
  var id = req.params.id;
  console.log("Loading category "+id);

  // send row information
  var syntax = { Category_ID: id };

  // get category row
  connection.query('SELECT * FROM `sfhackday`.`CATEGORIES` WHERE ?', syntax, function(err, results1) {

    // get threads under that category
    connection.query('SELECT * FROM `sfhackday`.`THREAD` WHERE ?', syntax, function(err, results2) {
      //console.log(results1);
      //console.log(results2);
      res.send({ 'category': results1[0], 'threads': results2 });
    });
  });
});

app.get('/get-thread/:id', function(req, res) {
  var id = req.params.id;
  console.log("Loading comments for thread "+id);
  var syntax = { ID: id };
  connection.query('SELECT * FROM `sfhackday`.`COMMENTS` WHERE ?', syntax, function(err, results1) {
    syntax = { Id : id }
    connection.query('SELECT * FROM `sfhackday`.`THREAD` WHERE ?', syntax, function(err, results2) {
      res.send({ 'comments' : results1, 'thread' : results2[0] });
    });
  });
});

app.get('/get-user/:alias', function(req, res) {
  var Ualias = req.params.alias;
  console.log("Loading user "+Ualias);
  var syntax = { Alias: Ualias };
  connection.query('SELECT * FROM `sfhackday`.`USER` WHERE ?', syntax, function(err, results) {
    res.send({'user': results[0] });
  });
});

// End Get By Id

// Update Database

app.get('/new-thread/:alias', function(req, res) {
  var Ualias = req.params.alias;
  var category = req.query.category;
  var body = req.query.body;

  // build that query
  var statement = "INSERT INTO `sfhackday`.`THREAD` VALUES ( NULL," +
  "'" + body + "', current_date(), " +
  category + ", '" + Ualias + "');";

  connection.query(statement, function(err, results) {
    if (err) throw err;
    res.send({'message': "Success!"});
  });
});

app.get('/new-comment/:alias', function(req, res) {
  var Ualias = req.params.alias;
  var thread = req.query.thread;
  var body = req.query.body;

  // build that query
  var statement = "INSERT INTO `sfhackday`.`COMMENTS` VALUES ( NULL, " +
  "'" + body + "', " + thread + ", " + "'" + Ualias + "', current_date(), 0);";
  console.log(statement)

  connection.query(statement, function(err, results) {
    if (err) throw err;
    res.send({'message': "Success!"});
  });
});
