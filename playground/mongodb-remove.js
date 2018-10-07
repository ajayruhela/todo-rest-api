var {mongoose} = require('../server/db/mongoose');
var {Todo} = require('../server/models/todo');
var {User} = require('../server/models/user');
var {ObjectID} = require('mongodb');
var id = '5bb93b60b9addf2da0f57c09'
var uid = '5bb696f6597dc320c4401eac'

 
// delete items
//  Todo.remove
//Todo.findOneAndRemove
//or
 if(!ObjectID.isValid(id)){
        console.log('id is not valid');
       }else{
              Todo.findByIdAndRemove(id).then((todo)=>{
                        if(!todo){
                            return console.log('id not found');
                        }
                        console.log('removed todo : ', todo);
                    }).catch((e)=>console.log(e));
            }    