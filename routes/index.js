var express = require('express');
var router = express.Router();
var usersRouter = require('./usersRouter');
var dishRouter = require('./dishRouter');

// DB stuff
var mongoose = require('mongoose');
var dbname = 'conFusion';
var url = "mongodb://localhost:27017/" + dbname;

mongoose.connect(url);
var db = mongoose.connection;
db.on('error', function(err, stuff) {
	if(err) throw new Error('Do your db is running? ');

});

db.once('open', function(err) {
	if(err) throw err;
	console.log('You are now connected to db ' + dbname);
})

router.use('/dishes', dishRouter);
// router.use('/users', usersRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
