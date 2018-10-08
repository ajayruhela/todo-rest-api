const mongoose = require ('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
var userSchema = new mongoose.Schema({
    name:{
        type:'String',
        required: true, // to avoid adding empty docs with __v and _id only
        minlength:1,
        trim:true
    },
    email:{
        type:'String',
        required: true, // to avoid adding empty docs with __v and _id only
        minlength:1,
        trim:true,
        index:true,
        unique: true,
        validate:{
            validator :  validator.isEmail,
            message: '{VALUE} is not a valid email'
           }
        },
    password:{
        type:'String',
        required: true, // to avoid adding empty docs with __v and _id only
        minlength:6,
      },
      tokens:[{
          access: {
              type:'String',
              required :true
          },
          token:{
            type:'String',
            required :true
          }
      }]
});
//override the toJson method to send only id and email in response whentoken is generated
userSchema.methods.toJSON =function(){
    var user = this;
    var userObj = user.toObject();

    return _.pick(userObj,['_id','email']);
}
userSchema.statics.findByToken =function(token){
   var User = this;
   var decoded;
   try{
      decoded = jwt.verify(token,'abc123');
   }catch(e){
    //   return new Promise((resolve,reject)={
    //       reject();
    //   });  or
    return Promise.reject('authentication failed');
   }

   return User.findOne({
       '_id' : decoded._id,
       'tokens.token' : token,
        'tokens.access' : 'auth'
   });
};
userSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
    // user.tokens.push({
    //     access,
    //     token
    // })
    user.tokens = user.tokens.concat([{access , token}]);
    return user.save().then(()=>{
        return token;
    });
};
var User = mongoose.model('User', userSchema);
User.on('index', function (err) {
    if (err) console.error(err); // error occurred during index creation
  });
module.exports= {User};