var mongoose = require('mongoose');
var Dishes = require('../models/dishes.js');

var router = require('express').Router();
// TODO: Made error with this syntax vs router.get()
// TODO: Error while sending postman request json I used '' instead of ""
// TODO: Greska sa postmanom jer nisam slao dobar request, (slao sam POST umjesto GET)
router.route('/')
	.get(function(req, res) {
		console.log('I got you back ')
		Dishes.find({}, function(err, results) {
			res.json({name: results});
		})
	})
	.post(function(req, res) {
		// res.writeHead(200,{'Content-Type': 'text/json'});
		console.log('hello from post dishes' + req.body.id);
		//TODO redirekciju sam zeznuo kad sam pustio "/" i "dishes/" umjesto "/dishes/" Moras puni path napisati kad
		//radis redirekciju
		console.log(req.body);
		Dishes.create(req.body, function(err, result) {
			//posalji id od novog posta
			if(err) throw err;
			console.log(result)
			res.redirect("/dishes/" + result.id)
		})
	})

router.route('/:id')
	.get(function(req, res) {
		Dishes.findById(req.params.id, function(err, dish) {
			res.json(dish);
		})
	})


module.exports = router;
