var mongoose= require('mongoose');
var uri = require('../server.config').todoApp_dbUri;
mongoose.Promise = global.Promise;
mongoose.connect(uri ,{useNewUrlParser :true},(err, client) =>{
    if (err) {
        console.log(err);
    }else{
        console.log('connected to db');
    }
});
module.exports ={mongoose};