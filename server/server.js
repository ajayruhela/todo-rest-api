var  express = require('express');
var bodyParser = require('body-parser');
//local imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var  app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/todos",(req,res)=>{
    //console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc)=>{
       res.status(200).send(doc);
    },(err)=>{
        console.log(err);
        res.status(400).send(err);
    });
});


app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
});

module.exports={app};
// create a todo object
// var newTodo = new Todo({text:'Write an Article'});

// newTodo.save().then((doc)=>{
//     console.log('saved todo ',doc);
// },(err)=>{
//     console.log('unable to save todo', err);
// });

// var otherTodo = new Todo({
//     text:'Write a new Article',
//     completed : true,
//     completedAt : 123
// });

// otherTodo.save().then((doc)=>{
//     console.log('saved todo ',doc);
// },(err)=>{
//     console.log('unable to save todo', err);
// });


// // create user
// var newUser = new User({
//     email:'ajay@gmail.com'
// });
// // save
// newUser.save().then((doc)=>{
//     console.log('saved todo ',doc);
// },(err)=>{
//     console.log('unable to save todo', err);
// });

// // this will fail
// var newUser = new User({
//     email:''  // or {}
// });
// newUser.save().then((doc)=>{
//     console.log('saved todo ',doc);
// },(err)=>{
//     console.log('unable to save todo', err);
// });