var dbConnect = require('./db-connect');
var ObjectId = require('mongodb').ObjectID;

module.exports = {
  getAll,
  getOne,
  create
  // destroy
  // update
};

function getAll(done) {
  dbConnect(function connectHandler(err, db) {
    if (err) {
      done(err);
      return;
    }
    db.collection('jobs')
      .find(null, {notes: 0, createTime: 0} ) // sets up query
      .toArray(done); //gives us query as array
  });
}

function getOne(id, done) {
  console.log(id);
  dbConnect(function connectHandler(err, db) {
    if (err) {
      done(err);
      return;
    }
    db.collection('jobs')
      .find({ "_id" : ObjectId(id)}) // sets up query
      .toArray(done); //gives us query as array
  });
}

function create(data, done) {
  dbConnect(function connectHandler(err, db) {
    if (err) {
      done(err);
      return;
    }
    console.log("Data in model", data);
    data.createTime = Date.now();
    db.collection('jobs')
      .insert(data, done);
  });
}
