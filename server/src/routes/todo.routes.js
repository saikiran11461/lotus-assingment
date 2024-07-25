const todoController = require("../controllers/todo.controller");
const {Router} = require('express');
const todoRouter = Router();
const {Authentication} = require("../middlewares/authentication")

todoRouter.get("/",  todoController.getTodo);
todoRouter.get("/:id",Authentication, todoController.getSingleTodo);
todoRouter.post("/addTodo", Authentication, todoController.postTodo);
todoRouter.patch("/:id", Authentication, todoController.patchTodo);
todoRouter.delete("/:id", Authentication, todoController.deleteTodo)




module.exports = todoRouter;