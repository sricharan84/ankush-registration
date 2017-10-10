var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var Item = new ItemSchema(
//   { img: 
//       { data: Buffer, contentType: String }
//   }
// );
// var Item = mongoose.model('Clothes',ItemSchema);

module.exports = mongoose.model('registrations', {
    candidateName: {
        type: String,
        default: ''
    },
    fatherName: {
        type: String,
        default: ''
    },
    motherName: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    dob: {
        type: Number,
        default: ''
    },
    qualification: {
        type: String,
        default: ''
    },
    aadharNumber: {
        type: Number,
        default: ''
    },
    remarks: {
        type: String,
        default: ''
    },
    file: {
        type: String,
    }
});

// var URI = "mongodb://todo:todo@todocluster-shard-00-00-seonh.mongodb.net:27017,todocluster-shard-00-01-seonh.mongodb.net:27017,todocluster-shard-00-02-seonh.mongodb.net:27017/test?ssl=true&replicaSet=todoCluster-shard-0&authSource=admin";

// var MongoClient = require('mongodb').MongoClient;

// module.exports = MongoClient.connect(URI, function(err, db){
//     console.log('Db callback');
//     //db.close();
//     db.createCollection("TODO", );
// });