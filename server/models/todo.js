var mongoose = require ('mongoose');
var TodoSchema = new mongoose.Schema( {
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
var Todo = mongoose.model('Todo',TodoSchema);

module.exports= {Todo};