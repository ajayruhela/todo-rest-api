var mongoose = require ('mongoose');

var Todo = mongoose.model('Todo', {
    text:{
        type:String,
        required: true, // to avoid adding empty docs with __v and _id only
        minlength:1,
        trim:true
    },
    completed:{
        type:Boolean,
        default: false
    },
    completedAt:{
        type:Number, // unix timestamp
         default:null
    }
});

module.exports= {Todo};