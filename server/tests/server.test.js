const expect = requir('expect');
const request = require('supertest');

const {app} = require('./../server');
const{Todo} = require('./../models/todo');
var countTodos =0;

beforeEach((done)=>{
  Todo.countDocuments((err,count)=>{
    if(count){
    countTodos = count;
    console.log(`there are ${count} todos`)
    }
    done();
  }); // it will  delete all todos on start 
});

describe('POST /todos',()=>{

it('should create a new todo',(done)=>{
  var text = 'test todo text';

  request(app)
  .post('/todos')
  .send({text})
  .expec(200)
  .expect((res)=>{
      expect(res.body.text).toBe(text);
  })
  .end((err,res)=>{
      if(err){
          return done(err);
      }
      Todo.find().then((todos)=>{
       expect(todos.length).toBe(countTodos + 1);
       expect(todos[0].text).toBe(text);
       done();
      }).catch(e=>done(e));
  });
});
it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(countTodos);
          done();
        }).catch((e) => done(e));
      });
  });
});
