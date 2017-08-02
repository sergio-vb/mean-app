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
	
	//if ( (!task.title) || !(task.isDone + '')){
	if(!task.title || typeof task.isDone === 'undefined' || task.isDone === null || task.isDone === "" ){
			res.status(400);
			res.json({
				"error": "Bad data"
			});
	}else{
		db.tasks.save(task, function(err, task){
			if(err){
				res.send(err);
			}
			res.json(task);
		})
	}
});

//Delete a single task
router.delete('/task/:id', function(req, res, next){
	db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
		if(err){
			res.send(err);
		}
		res.json(task);
	});
});

//Update task
router.put('/task/:id', function(req, res, next){
	var task = req.body;
	var updatedTask = {};

	if ( typeof task.isDone !== 'undefined' && task.isDone !== null && task.isDone !== "" ){
		updatedTask.isDone = task.isDone;
		console.log("Task.isDone == truthy");
	}
	if (task.title){
		updatedTask.title = task.title;
	}

	if(!updatedTask){ //Incorrect, will always evaluate to false
		res.status(400);
		res.json({
			"error":"Bad data"
		});
	}else{
		db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updatedTask, {}, function(err, task){
			if(err){
				res.send(err);
			}
			res.json(task);
		});
	}

	
});

module.exports = router;