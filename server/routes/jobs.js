var express = require('express');
var router = express.Router();
var jobsModel = require('../models/jobs');

router.get('/', function allJobs(req, res) {
  jobsModel.getAll(function dataRetrieved(err, data) {
    if(err) {
      console.error(err);
      res.status(500).send('Failed to retrieve jobs');
      return;
    }
    res.json(data);
  });
});

router.get('/:id', function getSingleJob(req, res){
  console.log(req.params.id);
  jobsModel.getOne(req.params.id, function dataRetrieved(err, data) {
    if(err) {
      console.error(err);
      res.status(500).send('Failed to retrieve your job');
      return;
    }
    res.json(data);
  });
});

router.post('/', function createJobbie(req, res){
  jobsModel.create(req.body, function dataCreated(err, data) {
    if(err) {
      console.error(err);
      return;
    }
    console.log("Data that came back from the callbackin route", data);
    res.json(data);
  });
});

module.exports = router;
