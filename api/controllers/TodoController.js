/**
 * TodoController
 *
 * @description :: Server-side logic for managing todoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add:function(req,res){
        res.view()
    },

    new:function(req,res){
        // Todo.create(req.params);
        // res.redirect("/");

        TodoService.create(req.param('todo'),req.user).then((record)=>{
            
            res.redirect("todo/list");
        }).catch((err)=>{
            return res.view("todo/add",{note:err})
           
        });
    },

    list:function(req,res){
        TodoService.listTodos(req.user).then((records)=>{
            // sails.log(records)
            res.view("todo/list",{todos:records});
        }).catch((err)=>{
            sails.log(err)
            res.view("todo/list",{todos:err});
        })
    },


    editView:function(req,res,error){
        if(_.isFunction(error))
            error=""
        TodoService.findTodo(req.param('id')).then((todo)=>{
           
            res.view("todo/edit",{todoToEditAction:todo.action,todoToEditId:todo.id,note:error})
        }).catch((id)=>{
            res.view("todo/edit",{note:"Error Editing This Todo, Please Add a new one"})
        })
        
    },

    edit:function(req,res){

        TodoService.editTodo(req.param('id'),req.param('todo')).then(()=>{
            res.redirect("todo/list");
        }).catch((id)=>{
           this.editView(req,res,"Error Editing Empty Todo")

        })
    },

    delete:function(req,res){
        TodoService.deleteTodo(req.param('id')).then(()=>{
            res.redirect("todo/list")
        }).catch((err)=>{
            res.redirect("todo/list")
        })
    },

    done:function(req,res){
        TodoService.markAsDone(req.param('id')).then(()=>{
            res.redirect("todo/list")
        }).catch((err)=>{
            //render the list view with the error message
            res.redirect("todo/list")
        })
    }




};

