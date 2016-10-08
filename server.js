// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

// Configuration
mongoose.connect('mongodb://jbellingham91:jesse1991@ds033126.mlab.com:33126/dreamcatcher', ['dream']);

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Models
var Dream = mongoose.model('Dream', {
    userId: String,
    title: String,
    text: String,
    rating: Number,
    dateCreated: Date
}),
Comment = mongoose.model('Comment', {
    commenterId: String,
    text: String,
    dateAdded: String,
    rating: Number
});

// Dream routes

    // Get all dreams
    app.get('/api/dreams', function(req, res) {
        console.log("fetching dreams");

        // use mongoose to get all dreams in the database
        Dream.find(function(err, dreams) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err)
            }

            res.json(dreams); // return all dreams in JSON format
        });
    });

    // Get dream feed of user
    app.get('/api/feed/:user_id', function(req, res) {
        console.log("fetching dreams");

        // use mongoose to get all dreams in the database
        Dream.find({ userId: {'$ne' : req.params.user_id }}, function(err, dreams) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err)
            }

            res.json(dreams); // return all dreams in JSON format
        });
    });

    // Get dreams of user
    app.get('/api/dreams/:user_id', function(req, res) {
        //var userId = req.params.userId;
        console.log("fetching dreams of user");
 
        // use mongoose to get all dreams in the database
        Dream.find({ userId: req.params.user_id }, function(err, dreams) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err)
            }

            res.json(dreams); // return all dreams in JSON format
        });
    });

    // create dream and send back all dreams after creation
    app.post('/api/dreams', function(req, res) {

        console.log("creating dream");

        // create a dream, information comes from AJAX request from Ionic
        Dream.create({
            userId: req.body.userId,
            title: req.body.title,
            text: req.body.text,
            rating: req.body.rating,
            dateCreated: req.body.dateCreated,
            done: false
        }, function(err, review) {
            if (err)
                res.send(err);

            // get and return all the dreams after you create another
            Dream.find(function(err, dreams) {
                if (err)
                    res.send(err)
                res.json(dreams);
            });
        });
    });

    // delete a dream
    app.delete('/api/dreams/:dream_id', function(req, res) {
        Dream.remove({
            _id : req.params.dream_id
        }, function(err, dream) {

        });
    });

// Comment routes

    // Get all comments
    app.get('/api/comments', function(req, res) {
        console.log("fetching comments");

        // use mongoose to get all comments in the database
        Comment.find(function(err, comments) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err)
            }

            res.json(comments); // return all comments in JSON format
        });
    });

    // Get comments of user
    app.get('/api/comments/:user_id', function(req, res) {
        console.log("fetching comments of user");

        // use mongoose to get all comments in the database
        Comment.find({ userId: req.params.user_id }, function(err, comments) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err)
            }

            res.json(comments); // return all comments in JSON format
        });
    });

    // create comment and send back all comments after creation
    app.post('/api/comments', function(req, res) {

        console.log("creating comment");

        // create a comment, information comes from AJAX request from Ionic
        Comment.create({
            commenterId: req.body.userId,
            text: req.body.text,
            dateAdded: req.body.dateAdded,
            done: false
        }, function(err, review) {
            if (err)
                res.send(err);

            // get and return all the dreams after you create another
            Comment.find(function(err, comments) {
                if (err)
                    res.send(err)
                res.json(comments);
            });
        });
    });

    // delete a comment
    app.delete('/api/comments/:comment_id', function(req, res) {
        Comment.remove({
            _id : req.params.comment_id
        }, function(err, comment) {

        });
    });
// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");