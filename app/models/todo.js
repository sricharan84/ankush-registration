var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var Item = new ItemSchema(
//   { img: 
//       { data: Buffer, contentType: String }
//   }
// );
// var Item = mongoose.model('Clothes',ItemSchema);

module.exports = mongoose.model('Todo', {
    text: {
        type: String,
        default: ''
    },
    img: {
        data: Buffer,
        contentType: String
    }
});

// var URI = "mongodb://todo:todo@todocluster-shard-00-00-seonh.mongodb.net:27017,todocluster-shard-00-01-seonh.mongodb.net:27017,todocluster-shard-00-02-seonh.mongodb.net:27017/test?ssl=true&replicaSet=todoCluster-shard-0&authSource=admin";

// var MongoClient = require('mongodb').MongoClient;

// module.exports = MongoClient.connect(URI, function(err, db){
//     console.log('Db callback');
//     //db.close();
//     db.createCollection("TODO", );
// });