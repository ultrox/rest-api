var mongoose = require('mongoose');
var Dishes = require('../models/dishes.js');

var router = require('express').Router();
// MISTAKE: Made error with this syntax vs router.get()
// MISTAKE: Error while sending postman request json I used '' instead of ""
// MISTAKE: Greska sa postmanom jer nisam slao dobar request, (slao sam POST umjesto GET)
router.route('/')
	.get(function(req, res) {
		console.log('I got you back ')
		Dishes.find({}, function(err, results) {
			res.json({name: results});
		})
	})
	.post(function(req, res) {
		console.log('hello from post dishes' + req.body.id);
		//MISTAKE: redirekciju sam zeznuo kad sam pustio "/" i "dishes/" umjesto "/dishes/" Moras puni path napisati kad
		Dishes.create(req.body, function(err, result) {
			//posalji id od novog posta
			if(err) throw err;
			res.redirect("/dishes/" + result.id)
		})
	}).delete(function(req, res) {
		//MISTAKE: Zaboravio kako ide ova funkcija
		Dishes.remove({}, function(err, result) {
			if(err) throw err;
			res.json({msg: "All posts deleted, thanks for flying with us!"});
		})
	})

router.route('/:id')
	.get(function(req, res) {
		Dishes.findById(req.params.id, function(err, dish) {
			res.json(dish);
		})
	})
	.delete(function(req, res) {
		var id = req.params.id;
		Dishes.findByIdAndRemove(id, function(err, dish) {
			if(err) throw err;
			dish.msg = "Deleted";
			res.json(dish);
		})
	}).put(function(req, res) {
		var id = req.params.id;
		Dishes.findByIdAndUpdate(id, {$set: req.body}, {new: true}, function(err, dish) {
			if(err) throw err;
			res.json(dish);
		});
	})

router.route('/:id/comments')
	.get(function(req, res) {
		var dishId = req.params.id;
		Dishes.findById(dishId, function(err, dish) {
			if(err) throw err;
			//array of objects
			res.json(dish.comments)
		});
	})
	.post(function(req, res) {
		//create new comment
		var dishId = req.params.id;
		Dishes.findById(dishId, function(err, dish) {
			if(err) throw err;
			var comment = req.body;
			dish.comments.push(comment);

			dish.save(function(err, result) {
				console.log('saved', result);
				res.json(dish.comments)
			});
		})
	})
	.delete(function(req, res) {
		//delete all comments
		var dishId = req.params.id;
		Dishes.findById(dishId, function(err, dish) {
			dish.comments = [];
			dish.save();
			res.json({msg: 'Deleted all comments'})
		})
	})

router.route('/:id/comments/:cid')
	.get(function(req, res) {
		//get specific comment
	})
	.delete(function(req, res) {
		//delete single comments
		
	})

module.exports = router;
