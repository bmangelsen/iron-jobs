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
    console.log(data);
    res.json(
      {
        "id": data.ops[0]._id,
        "company": data.ops[0].company,
        "notes": data.ops[0].notes,
        "link": data.ops[0].link,
        "createTime": data.ops[0].createTime
      });
  });
});

router.delete('/:id', function deleteJob(req, res) {
  jobsModel.destroy(req.params.id, function dataDeleted(err, data) {
    if(err) {
      console.error(err);
      return;
    }
    res.json(data);
  });
});

module.exports = router;
