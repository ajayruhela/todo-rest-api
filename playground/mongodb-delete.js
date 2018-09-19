//const MongoClient = require ('mongodb').MongoClient;
// es6 object destructuring to use variable names from the imported module

const {MongoClient, ObjectID} = require ('mongodb');

var uri = "mongodb://V03W1111:lIcUwLJ9jGG4I115@c1-shard-00-00-wiiu6.gcp.mongodb.net:27017,c1-shard-00-01-wiiu6.gcp.mongodb.net:27017,c1-shard-00-02-wiiu6.gcp.mongodb.net:27017/RestAPIDB?ssl=true&replicaSet=C1-shard-0&authSource=admin&retryWrites=true";
MongoClient.connect (uri, {useNewUrlParser :true},(err, client) =>{
    if (err) {
        console.log(err);
    }else{
        console.log('connected to db');
  // read
        //client.db("RestAPIDB").collection("todos").find({completed:false}).toArray().then((docs)=>{
            // client.db("RestAPIDB").collection("todos").find({
            //     _id: new ObjectID('5ba0099383481f3710a68484')
            // }).toArray().then((docs)=>{
            //     console.log(JSON.stringify(docs,undefined,2));
            // },(err)=>{
            //     console.log(`unable to fetch docs - ${err}`);
            // });
// get the count count takes a callback
            // client.db("RestAPIDB").collection("todos").countDocuments({completed:false}).then((count)=>{
            //     console.log(`pending todos are ${count} `);
            // },(err)=>{
            //     console.log(`unable to fetch docs - ${err}`);
            // });
        // read users with filter on name
        client.db("RestAPIDB").collection("users").find({name:'ajay'}).toArray().then((docs)=>{
               console.log(JSON.stringify(docs,undefined,2));
            },(err)=>{
                console.log(`unable to fetch docs - ${err}`);
            });
   client.close();
    }
});


//mongodb://V03W1111:<PASSWORD>@c1-shard-00-00-wiiu6.gcp.mongodb.net:27017,c1-shard-00-01-wiiu6.gcp.mongodb.net:27017,c1-shard-00-02-wiiu6.gcp.mongodb.net:27017/
//test?ssl=true&replicaSet=C1-shard-0&authSource=admin&retryWrites=true