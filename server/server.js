const _ = require('lodash');
const  express = require('express');  // chapter 76 start
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
//local imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var  app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
//GET todos
app.get('/todos/:id',(req,res)=>{
   var id = req.params.id;
   if(!ObjectID.isValid(id))
   {
    return res.status(404).send("Not a valid Id");
   }
        Todo.findById(id).then((todo)=>{
            if(!todo){
                return res.status(404).send();
            }
            res.status(200).send({todo});
        }).catch((err)=>{
            console.log(err);
             res.status(404).send(err);
        });
    
});
app.get("/todos",(req,res)=>{ 
    Todo.find().then((todos)=>{
       res.status(200).send({todos});
    },(err)=>{
        console.log(err);
        res.status(400).send(err);
    });
});
//POST /todos
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

//Delete  /todos/id
app.delete("/todos/:id",(req,res)=>{
    var id = req.params.id;
   if(!ObjectID.isValid(id))
   {
    return res.status(404).send("Not a valid Id");
   }
        Todo.findByIdAndRemove(id).then((todo)=>{
            if(!todo){
                return res.status(404).send();
            }
            res.status(200).send({todo});
        }).catch((err)=>{
            console.log(err);
             res.status(404).send(err);
        });
});

//Patch  /todos/id
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }
  
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
  
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    })
  });
  
  //POST user
//   app.post("/users",(req,res)=>{
//     var body = _.pick(req.body, ['name', 'email','password']);
//     var user = new User(body);
//    user.save().then((user)=>{
//         //return user.generateAuthToken()
//       return res.status(200).send({user});
//     },(err)=>{
//         //console.log(err);
//        return res.status(400).send(err);
//     });
// });

// POST /users with token

app.post("/users",(req,res)=>{
    var body = _.pick(req.body, ['name', 'email','password']);
    var user = new User(body);
   user.save().then(()=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth', token).send(user);
    }).catch((e)=>{
        return res.status(400).send(e);
    });
});

// GET /users
app.get("/users",(req,res)=>{ 
    User.find().then((users)=>{
       res.status(200).send({users});
    },(err)=>{
        //console.log(err);
        res.status(400).send(err);
    });
});
app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
});

module.exports={app};

