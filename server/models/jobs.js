var dbConnect = require('./db-connect');
var ObjectId = require('mongodb').ObjectID;

module.exports = {
  getAll,
  getOne,
  create,
  destroy
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
  dbConnect(function connectHandler(err, db) {
    if (err) {
      done(err);
      return;
    }
    db.collection('jobs')
      .findOne({ "_id" : ObjectId(id)}, function foundObject(err, foundJob) {
        if (err) {
          done(err);
          return;
        }
        done(null, foundJob);
      });
  });
}

function create(data, done) {
  dbConnect(function connectHandler(err, db) {
    if (err) {
      done(err);
      return;
    }
    data.createTime = Date.now();
    db.collection('jobs')
      .insert(data, done);
  });
}

function destroy(id, done) {
    dbConnect(function connectHandler(err, db) {
      if (err) {
        done(err);
        return;
      }

      getOne(id, function returnAndDeleteJob(err, job) {


        db.collection('jobs').remove({'_id': job._id}, function deletedJoh(err, numberDeleted) {
          if (err) {
            done(err);
            return;
          }
          console.log("found job", job);
          done(null, numberDeleted);
        });

      });

    });
}
