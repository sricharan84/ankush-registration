var mongoose = require('mongoose'),
    mongoXlsx = require('mongo-xlsx'),
    database = require('./config/database'),
    userData = require('./app/models/users');

mongoose.connect(database.remoteUrl).then(function () {
  console.log('Mongoose default connection open to ');
  userData.find(function(err, userInfo){
        var model = mongoXlsx.buildDynamicModel(userInfo);

        mongoXlsx.mongoData2Xlsx(userInfo, model, function(err, data) {
        console.log('File saved at:', data.fullPath); 
        });
  });
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
