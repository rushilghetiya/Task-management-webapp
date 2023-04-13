const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});

// const DB = process.env.DATABASE;
const settingDB = process.env.SETTING_DATABASE;

// const taskDb = mongoose.createConnection(DB);

// .then(()=>{
//     console.log("Connection Successfull...");
// }).catch((error)=>{
//     console.log(error);
// })
const settingdb = mongoose.createConnection(settingDB);
// .then(()=>{
//     console.log("setting Connection Successfull...");
// }).catch((error)=>{
//     console.log(error);
// })

// taskDb.on('error', console.error.bind(console, 'connection error:'));
// taskDb.once('open', () => {
//   console.log('task connected');
// });
settingdb.on('error', console.error.bind(console, 'connection error:'));
settingdb.once('open', () => {
  console.log('setting connected');
});


// module.exports = {taskDb,settingdb};
// module.exports = taskDb;

module.exports =settingdb ;


// const { MongoClient } = require("mongodb");
// const dotenv = require('dotenv');

// dotenv.config({path:'./config.env'});

// const Db = process.env.DATABASE;
// const client = new MongoClient(Db, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
 
// var taskDb,settingDb;
 
// module.exports = {
//   connectToServer: function (callback) {
//     client.connect(function (err, db) {
//       // Verify we got a good "db" object
//       if (db)
//       {
//         taskDb = db.db("task");
//         settingDb = db.db("setting");
//         console.log("Successfully connected to MongoDB."); 
//       }
//       return callback(err);
//          });
//   },
 
//   getDb: function () {
//     return {taskDb,settingDb};
//   },
// };

