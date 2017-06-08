/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    login:function(req,res){
        if(req.user){
            
            return res.redirect('todo/list')
        }
        res.view()
    }
   
};

