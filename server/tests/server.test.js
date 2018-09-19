const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const{Todo} = require('../models/todo');
var countTodos =0;

// beforeEach((done)=>{
//   Todo.deleteMany().then((res)=>{done()},(err)=>{done(err)})
// });

describe('POST /todos',()=>{

it('should create a new todo',(done)=>{
  var text = 'test todo text';

  request(app)
  .post('/todos')
  .send({text:text})
  .expect(200)
  .expect((res)=>{
      expect(res.body.text).toBe(text);

  })
  .end((err,res)=>{
      if(err){
          return done(err);
      }
    console.log(res.body);
    done();
  });
});
it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send()
      .expect(400)
      .end((err, res) => {
         if(res.body.errors.text.name==='ValidatorError'){
          //console.log('My Error -->',res.body);
          return done();
         }else{
        return done(new Error('Failed because the validation error was not thrown'));
         }
        })
      });
  });// describe post

//Get tests

 describe('GET /todos',()=>{

    it('should get all todos',(done)=>{
      
      request(app)
      .get('/todos')
      .send()
      .expect(200)
      .end((err,res)=>{
          if(err){
              return done(err);
          }
         else{
              console.log(res.body.todos);
              done();
         }
           
          })
      });
    });
