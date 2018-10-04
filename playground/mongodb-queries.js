var {mongoose} = require('../server/db/mongoose');
var {Todo} = require('../server/models/todo');
var {User} = require('../server/models/user');
var {ObjectID} = require('mongodb');
var id = '5bb68ebe9c961127cc6509bb'
var uid = '5bb696f6597dc320c4401eac'

//User.insertMany([{name:'Ajay',email:'a@g.b'}]).then(()=>console.log('user created'));
if(!ObjectID.isValid(id)){
    console.log('id is not valid');
}
else{
// Todo.find({_id:id}).then((todos)=>{
//     if(todos.length==0){
//         return console.log('id not found');
//     }
//     console.log('Todos',todos);
// }).catch((e)=>console.log(e));

// Todo.findOne({_id:id}).then((todo)=>{
//     if(!todo){
//         return console.log('id not found');
//     }
//     console.log('Todo',todo);
// }).catch((e)=>console.log(e));

Todo.findById(id).then((todo)=>{
    if(!todo){
        return console.log('id not found');
    }
    console.log('Todo by Id',todo);
}).catch((e)=>console.log(e));
}
// for user 
//User.insertMany([{name:'Ajay',email:'a@g.b'}]).then(()=>console.log('user created'));
if(!ObjectID.isValid(uid)){
    console.log('uid is not valid');
}
else{
    User.findById(uid).then((user)=>{
        if(!user){
            return console.log('id not found');
        }
        console.log('User by Id',user);
    }).catch((e)=>console.log(e));
    }