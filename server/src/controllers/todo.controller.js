const todoModel = require("../models/todos.model");


const todoController = {
    getTodo:async(req,res)=>{
        try {
            const Todo = await todoModel.find().populate("user", "name");
            return res.status(200).send({message :"getTodo Success", Todo})
        } catch (error) {
            return res.status(500).send({message :error.message, error});
        }
    },

    getSingleTodo:async(req,res)=>{
        try {
            const Todo = await todoModel.findById(req.params.id);
            return res.status(200).send({message :"singTodo Success", Todo})
        } catch (error) {
            return res.status(500).send({message :error.message, error});
        }
    },

    postTodo:async(req,res)=>{
       
        try {
            const Todo = await todoModel.create(req.body);
            return res.status(200).send({message :"postTodo Success", Todo})
        } catch (error) {
            return res.status(500).send({message :error.message, error});
        }
    },

    deleteTodo:async(req,res)=>{
        try {
            const Todo = await todoModel.findByIdAndDelete(req.params.id);
            return res.status(200).send({message :"deletedTodo Success", Todo})
        } catch (error) {
            return res.status(500).send({message :error.message, error});
        }
    },

    patchTodo:async(req,res)=>{
        try {
            const Todo = await todoModel.findByIdAndUpdate(req.params.id, req.body,{new:true});
            return res.status(200).send({message :"patchTodo Success", Todo})
        } catch (error) {
            return res.status(500).send({message :"error message", error});
        }
    },

}


module.exports = todoController;