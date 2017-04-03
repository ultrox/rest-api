var mongoose = require('mongoose');
var Dishes = require('../models/dishes.js');
var Comment = require("../models/comments.js");

var router = require('express').Router();
// MISTAKE: Made error with this syntax vs router.get()
// MISTAKE: Error while sending postman request json I used '' instead of ""
// MISTAKE: Greska sa postmanom jer nisam slao dobar request, (slao sam POST umjesto GET)
router.route('/')
	.get(function(req, res) {
		console.log('I got you back ')
		Dishes.find({}, function(err, dishes) {
			res.json(dishes);
		})
	})
	.post(function(req, res) {
		// console.log('hello from post dishes' + req.body.id);
		//MISTAKE: redirekciju sam zeznuo kad sam pustio "/" i "dishes/" umjesto "/dishes/" Moras puni path napisati kad
		Dishes.create(req.body, function(err, dish) {
			if(err) throw err;
			var id = dish._id;
			res.json("Hello, I just created dish for you ID: " + id);
		})
	}).delete(function(req, res) {
		//MISTAKE: Zaboravio kako ide ova funkcija
		Dishes.remove({}, function(err, result) {
			if(err) throw err;
			res.json(result);
		})
	})

// dishes/dishId
router.route('/:dishId')
	.get(function(req, res) {
		Dishes.findById(req.params.dishId, function(err, dish) {
			res.json(dish);
		})
	})
	.delete(function(req, res) {
		Dishes.findByIdAndRemove(req.params.dishId, function(err, result) {
			if(err) throw err;
			res.json(result);
		})
	})
	.put(function(req, res) {
		var id = req.params.dishId;
		Dishes.findByIdAndUpdate(id, {$set: req.body}, {new: true}, function(err, dish) {
			if(err) throw err;
			res.json(dish);
		});
	})

//COMMENTS start
router.route('/:dishId/comments')
	.get(function(req, res) {
		Dishes.findById(req.params.dishId, function(err, dish) {
			if(err) throw err;
			//array of objects
			res.json(dish.comments)
		});
	})
	.post(function(req, res) {
		//create new comment
		Dishes.findById(req.params.dishId, function(err, dish) {
			if(err) throw err;
			dish.comments.push(req.body)
			dish.save(function(err, newDish) {
				if(err) throw err;
				var id = newDish.comments[newDish.comments.length -1 ]._id;
				res.json('new comment added ' + id);
			});
		})
	})
	.delete(function(req, res) {
		//delete all comments
		Dishes.findById(req.params.dishId, function(err, dish) {
			dish.comments = [];
			dish.save();
			res.json({msg: 'Deleted all comments'})
		})
	})

router.route('/:dishId/comments/:commentId')
	.get(function(req, res) {
		//get specific comment
		//START HERE  = just get that comment
		Dishes.findById(req.params.dishId, function(err, dish) {
			if(err) throw err;
			res.json(dish.comments.id(req.params.commentId));
		})
	})
	.delete(function(req, res) {
		//delete single comments
		Dishes.findById(req.params.dishId, function(err, dish) {
			dish.comments.id(req.params.commentId).remove();
			dish.save(function(err, result) {
				if(err) throw err;
				res.json(result);
			})
		})
	})
	.put(function(req, res) {
		var cid = req.params.cid;
		Dishes.findById(req.params.dishId, function(err, dish) {
			dish.comments.id(req.params.commentId).remove();
			dish.comments.push(req.body);

			dish.save(function(err, result) {
				if(err) throw err;
				res.json(result);
			})
		})
	})

module.exports = router;
