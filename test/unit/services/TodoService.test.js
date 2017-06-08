
require("sails-test-helper");

var mock = require('sails-mock-models');


describe(TEST_NAME,function(){

    context(".create()",function(){
        beforeEach(function(done) {
            var todoSample={action:"sample",done:false}
            mock.mockModel(Todo, 'create',todoSample);
        done()
        });
    
        it("should be the sample object",function(done){
            let testObject = {action:"sample",hello:"this is the end"};
            var todo = TodoService.validateAction(testObject.action)
            //.exec(function(err,record){
                
               todo.should.equal(true);
               Todo.create.restore();
               done();
           // })

        })
            
    })
    
    
})