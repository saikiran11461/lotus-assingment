const { body, validationResult } = require('express-validator');
const todoModel = require("../models/todos.model");

const todoController = {
    getTodo: async (req, res) => {
        try {
            const Todo = await todoModel.find().populate("user", "name");
            return res.status(200).send({ message: "getTodo Success", Todo });
        } catch (error) {
            return res.status(500).send({ message: error.message, error });
        }
    },

    getSingleTodo: async (req, res) => {
        try {
            const Todo = await todoModel.findById(req.params.id);
            return res.status(200).send({ message: "singleTodo Success", Todo });
        } catch (error) {
            return res.status(500).send({ message: error.message, error });
        }
    },

    postTodo: [
        // Validation middleware
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('user').notEmpty().withMessage('User is required'),

        // Handle validation errors
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).send({ errors: errors.array() });
            }
            next();
        },

        // Controller logic
        async (req, res) => {
            try {
                const Todo = await todoModel.create(req.body);
                return res.status(200).send({ message: "postTodo Success", Todo });
            } catch (error) {
                return res.status(500).send({ message: error.message, error });
            }
        }
    ],

    deleteTodo: async (req, res) => {
        try {
            const Todo = await todoModel.findByIdAndDelete(req.params.id);
            return res.status(200).send({ message: "deletedTodo Success", Todo });
        } catch (error) {
            return res.status(500).send({ message: error.message, error });
        }
    },

    patchTodo: async (req, res) => {
        try {
            const Todo = await todoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).send({ message: "patchTodo Success", Todo });
        } catch (error) {
            return res.status(500).send({ message: "error message", error });
        }
    },
};

module.exports = todoController;
