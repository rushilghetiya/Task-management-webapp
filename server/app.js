// const express = require('express');
// const app=express();
// const cors=require("cors");


// const taskRoutes = require("./Routes/Route")
// const settingRoutes = require("./Routes/settingRoute")

// require("./db/conn")
// app.get('/',(req,res)=>{
//     res.send("Connecting Home...")
// })

// app.use(
//     cors({
//         origin:"http://localhost:3000",
//         credentials:true,
//     })
// )
// app.use(express.json());

// app.use(taskRoutes);
// app.use(settingRoutes);



// app.listen(8000,()=>{
//     console.log("App is listening at 8000...")
// })

const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const path = require('path');
const routes = require('./Routes/Route');
const dotenv = require('dotenv');
const cors=require("cors");


dotenv.config({path:'./config.env'});

const port = process.env.PORT || 5050;

const app = express();
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
//connect to database

// const taskDb=mongoose.createConnection(process.env.DATABASE, {useNewUrlParser: true});
// taskDb.on('error', console.error.bind(console, 'connection error:'));
// taskDb.once('open', () => {
//   console.log('task connected');
// });

app.use(bodyParser.json());
app.use('/api',routes);



app.listen(port, () => {
    console.log(`Port running on ${port}`)
});

// module.exports=taskDb;