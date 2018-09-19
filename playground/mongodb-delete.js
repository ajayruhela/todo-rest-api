const {MongoClient, ObjectID} = require ('mongodb');

var uri = "mongodb://V03W1111:lIcUwLJ9jGG4I115@c1-shard-00-00-wiiu6.gcp.mongodb.net:27017,c1-shard-00-01-wiiu6.gcp.mongodb.net:27017,c1-shard-00-02-wiiu6.gcp.mongodb.net:27017/RestAPIDB?ssl=true&replicaSet=C1-shard-0&authSource=admin&retryWrites=true";
MongoClient.connect (uri, {useNewUrlParser :true},(err, client) =>{
    if (err) {
        console.log(err);
    }else{
        console.log('connected to db');
//delete many
client.db("RestAPIDB").collection("todos").deleteMany({task:'eat lunch'}).then((result)=>{
    console.log(result);
},(err)=>{
    console.log(err);
});

//delete one
client.db("RestAPIDB").collection("todos").deleteOne({task:'eat lunch'}).then((result)=>{
    console.log(result);
},(err)=>{
    console.log(err);
});
//findone and delete
client.db("RestAPIDB").collection("todos").findOneAndDelete({task:'eat lunch'}).then((result)=>{
    console.log(result);
},(err)=>{
    console.log(err);
});

   client.close();
    }
});


//mongodb://V03W1111:<PASSWORD>@c1-shard-00-00-wiiu6.gcp.mongodb.net:27017,c1-shard-00-01-wiiu6.gcp.mongodb.net:27017,c1-shard-00-02-wiiu6.gcp.mongodb.net:27017/
//test?ssl=true&replicaSet=C1-shard-0&authSource=admin&retryWrites=true