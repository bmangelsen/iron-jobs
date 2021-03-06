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
      .find()
      .toArray(function completedArray(err, data) {
        var cleanData = data.map(function jobMap(data) {
          return {
            "id": data._id,
            "company": data.company,
            "link": data.link,
          };
        });
      done(err, cleanData);
      });
  });
}

function getOne(id, done) {
  dbConnect(function connectHandler(err, db) {
    if (err) {
      done(err);
      return;
    }
    db.collection('jobs')
      .findOne({ "_id" : new ObjectId(id)}, function foundObject(err, foundJob) {
        if (err) {
          done(err);
          return;
        }
        jobData = {
          "id": foundJob._id,
          "company": foundJob.company,
          "notes": foundJob.notes,
          "link": foundJob.link,
          "createTime": foundJob.createTime
        };
        console.log(jobData);
        done(null, jobData);
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
