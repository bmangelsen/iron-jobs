var express = require('express');
var bodyParser = require('body-parser');
var server = express();
server.set('port', process.env.PORT || 3000);

server.use(bodyParser.json());

server.use(express.static('client/public'));

server.use('/jobs', require('./routes/jobs'));

server.listen(server.get('port'), function serverStarted(err){

  if (err) {
    console.error(err);
  } else {
    console.log('Server started at http://localhost:' + server.get('port'));
  }

});
