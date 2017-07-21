var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://sergio:admin@ds111469.mlab.com:11469/tasklist_svb', ['tasks']);

//Get all tasks
router.get('/tasks', function(req, res, next){
	db.tasks.find(function(err, tasks){
		if(err){
			res.send(err);
		}
		res.json(tasks);
	});
});

//Get a single task
router.get('/task/:id', function(req, res, next){
	db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
		if(err){
			res.send(err);
		}
		res.json(task);
	});
});

//Save task
router.post('/task', function(req, res, next){
	var task = req.body;
	if(!task.title || ( typeof task.isDone === 'undefined' || task.isDone === null ) ){
			res.status(400);
			res.json({
				"error": "Bad data"
			});
	}else{
		db.tasks.save(task, function(err, task){
			if(err){
				res.send(err);
			}
			res.json(tasks);
		})
	}
});

module.exports = router;