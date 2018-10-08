const {SHA256} = require('crypto-js');

var msg = 'I am user number 3'
var hash = SHA256(msg).toString();

console.log(`message : ${msg}`);

console.log(`Hash : ${hash}`);

var data = {
    id :4
}

var token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

//hack
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data) ).toString();

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if(resultHash === token.hash){
    console.log('data was not changed');
}
else{
    console.log('data was changed');
}