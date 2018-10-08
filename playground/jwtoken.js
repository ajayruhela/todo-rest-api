const jwt = require('jsonwebtoken');
const c = require('cluster')
var data = {
    id :10
}

var token = jwt.sign(data,'123abc');  // data, secret
console.log(token);

//jwt.io

var decoded = jwt.verify(token,'123abc');
console.log('decoded:  ',decoded);