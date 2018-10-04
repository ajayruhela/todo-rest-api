var mongoose = require ('mongoose');
var User = mongoose.model('User', {
    name:{
        type:String,
        required: true, // to avoid adding empty docs with __v and _id only
        minlength:4,
        trim:true
    },
    email:{
        type:String,
        required: true, // to avoid adding empty docs with __v and _id only
        minlength:1,
        trim:true
    }
});
module.exports= {User};