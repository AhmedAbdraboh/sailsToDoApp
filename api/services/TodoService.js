module.exports={
    create:function(newAction,user){

       if(this.validateAction(newAction)){
            let newTodo = {action:newAction,owner:user}
            return new Promise((resolve,reject)=>{
                Todo.create(newTodo).exec(function(err,record){
                if(err)
                    reject(err)
                resolve(record);
            });
            }) 
       }else{
        return new Promise((resolve,reject)=>{
            reject("Something went wrong, Please Make sure to type valid ToDo Action")
        })
       }
    },

    validateAction:function(action){
        return action ? true : false
    },

    listTodos:function(user){
        return new Promise((resolve,reject)=>{
            // sails.log(user)
            Todo.find({owner:user.id}).exec(function(err,records){
                if(err)
                    reject(err)
                resolve(records)
            })
        })
    },

    findTodo:function(id){
        return new Promise((resolve,reject)=>{
            Todo.findOne({id:id}).exec(function(err,record){
                if(err)
                    reject(err)
                resolve(record)
            })
        })
    },

    editTodo:function(id,editedTodoAction){
        if(this.validateAction(editedTodoAction)){
        return new Promise((resolve,reject)=>{
            Todo.update({id:id},{action:editedTodoAction}).exec(function(err,updatedrecords){
                if(err)
                    reject(id)

                resolve(updatedrecords[0])
            })
        })
        }else{
        return new Promise((resolve,reject)=>{
            reject(id)
        })
       }
        
    },

    deleteTodo:function(id){
        return new Promise((resolve,reject)=>{
            Todo.destroy({id:id}).exec(function(err){
                if(err)
                    reject("Error Deleting this Todo")
                resolve(true)
            })
        })
    },

    markAsDone:function(id){
        return new Promise((resolve,reject)=>{
            Todo.update({id:id},{done:true}).exec(function(err,updatedrecords){
                if(err)
                    reject("Error Editing Todo Try Again!!")

                resolve(true)
            })
        })
    }

}