const expect = require('expect');
const request = require('supertest');
const ObjectID = require('mongodb').ObjectID;
const {app} = require('../server');
const{Todo} = require('../models/todo');
var countTodos =0;

const todos = [
    {
        _id : new ObjectID(),
        text:'First test todo'
    },
    {
        _id : new ObjectID(),
        text:'Second test todo'
    }];
beforeEach((done)=>{
  Todo.deleteMany({}).then(()=>{
      return Todo.insertMany(todos)
    }).then(()=>done())
});

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
      Todo.find({text}).then((todos)=>{
          expect(todos.length).toBe(1);
          done();
      }).catch((e)=>done(e));
  });
});
it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send()
      .expect(400)
      .end((err, res) => {
         if(res.body.errors.text.name==='ValidatorError'){
            Todo.find({}).then((todos)=>{
                expect(todos.length).toBe(2);
                done();
            }).catch((e)=>done(e));
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
      .expect(200)
      .expect((res)=>{
          expect(res.body.todos.length).toBe(2);
      }).end(done);
    
      });
    });
// Get todos/id
    describe('GET /todos/id',()=>{

        it('should get 404 due to invalid id',(done)=>{
          
          request(app)
          .get('/todos/5bb68ebe9c961127cc6509b')
          .expect(404)
        //   .expect((res)=>{
        //       expect(res.body).toBe('Not a valid Id');
        //   })
          .end(done);
        
          });
        
        
        it('should get 404 as no to do with this id',(done)=>{
          
            request(app)
            .get('/todos/5bb68ebe9c961127cc6509b6')
            .expect(404)
            .end(done);
          });

        it('should get 200 and the todo item with the given id',(done)=>{
          
                request(app)
                .get(`/todos/${todos[0]._id.toHexString()}`)
                .expect(200)
                .expect((res)=>{
                    expect(res.body.todo.text).toBe(todos[0].text)
                })
                .end(done);
              });
        });


        // delete todos/id
    describe('DELETE /todos/id',()=>{

        it('should get 404 due to invalid id',(done)=>{
          
          request(app)
          .get('/todos/5bb68ebe9c961127cc6509b')
          .expect(404)
          .end(done);
          });
        
        
        it('should get 404 as no to do with this id',(done)=>{
          
            request(app)
            .get('/todos/5bb68ebe9c961127cc6509b6')
            .expect(404)
            .end(done);
          });

        it('should get 200 and the deleted todo item ',(done)=>{
          
                request(app)
                .get(`/todos/${todos[0]._id.toHexString()}`)
                .expect(200)
                .expect((res)=>{
                    expect(res.body.todo.text).toBe(todos[0].text)
                })
                .end(done);
              });
        });

    // patch todos/id
    describe('PATCH /todos/id',()=>{

        it('should get 404 due to invalid id',(done)=>{
          
          request(app)
          .get('/todos/5bb68ebe9c961127cc6509b')
          .expect(404)
          .end(done);
          });
        
        
        it('should get 404 as no to do with this id',(done)=>{
          
            request(app)
            .get('/todos/5bb68ebe9c961127cc6509b6')
            .expect(404)
            .end(done);
          });

        it('should update the todo ',(done)=>{
          var hexID = todos[0]._id.toHexString();
          var text = 'update from local test'
                request(app)
                .patch(`/todos/${hexID}`)
                .send({
                    completed : true,
                    text
                })
                .expect(200)
                .expect((res)=>{
                    expect(res.body.todo.text).toBe(text);
                    expect(res.body.todo.completed).toBe(true);
                    expect(res.body.todo.completedAt).toBeGreaterThan(0);
                })
                .end(done);
              });
        it('should clear the completedAt when not completed ',(done)=>{
                var hexID = todos[0]._id.toHexString();
                var text = 'update from local test2'
                      request(app)
                      .patch(`/todos/${hexID}`)
                      .send({
                          completed : false,
                          text
                      })
                      .expect(200)
                      .expect((res)=>{
                          expect(res.body.todo.text).toBe(text);
                          expect(res.body.todo.completed).toBe(false);
                          expect(res.body.todo.completedAt).toBeNull();
                      })
                      .end(done);
              });
        });