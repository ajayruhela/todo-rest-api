var mongoose= require('mongoose');
var prduri = require('../server.config').todoApp_dbUri;
var testuri = require('../server.config').todoApp_testdbUri;
 process.env.MONGODB_URI = prduri;
mongoose.Promise = global.Promise;
// process.env.MONGODB_URI is set by heroku if we use the mLab mongo db as an addon for our app on heroku
if(process.env.NODE_ENV==='test'){
    process.env.MONGODB_URI = testuri;
}
 console.log('env: ',process.env.NODE_ENV);
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser :true},(err, client) =>{
    if (err) {
        console.log(err);
    }else{
        console.log('connected to db');
    }
});
module.exports ={mongoose};