//const MongoClient = require ('mongodb').MongoClient;
// es6 object destructuring to use variable names from the imported module
const {MongoClient, ObjectID} = require ('mongodb');
var obj = new ObjectID();
console.log(obj);

var uri = "mongodb://V03W1111:lIcUwLJ9jGG4I115@c1-shard-00-00-wiiu6.gcp.mongodb.net:27017,c1-shard-00-01-wiiu6.gcp.mongodb.net:27017,c1-shard-00-02-wiiu6.gcp.mongodb.net:27017/RestAPIDB?ssl=true&replicaSet=C1-shard-0&authSource=admin&retryWrites=true";
MongoClient.connect (uri, {useNewUrlParser :true},(err, client) =>{
    if (err) {
        console.log(err);
    }else{
        console.log('connected to db');

   const users = client.db("RestAPIDB").collection("users");
// read

   users.findOne({userid:3}).then((res,err)=>{
    if(res){
        console.log(res);
    }else{
        throw "Not Found";
    }

  }).catch((err)=>{
    console.log(err);
  });
    // find all
   var allUsers = users.find();
   allUsers.forEach(user=>{
      console.log(user);
   });
  //Insert one
//   users.insertOne({name:'Ramesh', age:27, userid:4},(err,result)=>{
//             if(err){
//                 return console.log('unable to insert', err);
//             }
//             console.log(JSON.stringify(result.ops,undefined,2));
//         });

// create a todoCollection
const todos = client.db("RestAPIDB").collection("todos");
// todos.insertOne({task:'Make an Angular app', status:"Pending", responsibleUserId:2},(err,result)=>{
//                 if(err){
//                     return console.log('unable to insert', err);
//                 }
//                 console.log(JSON.stringify(result.ops,undefined,2));
//             });

   // get all task
   
    var allTodos = todos.find();
    allTodos.forEach(todo=>{
       console.log(todo);
    });         
   client.close();
    }
});


//mongodb://V03W1111:<PASSWORD>@c1-shard-00-00-wiiu6.gcp.mongodb.net:27017,c1-shard-00-01-wiiu6.gcp.mongodb.net:27017,c1-shard-00-02-wiiu6.gcp.mongodb.net:27017/
//test?ssl=true&replicaSet=C1-shard-0&authSource=admin&retryWrites=true