var mongoose = require ('mongoose');
var User = mongoose.model('User', {
    email:{
        type:String,
        required: true, // to avoid adding empty docs with __v and _id only
        minlength:1,
        trim:true
    }
});
module.exports= {User};