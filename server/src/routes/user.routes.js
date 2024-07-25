const userController = require("../controllers/user.controller");
const {Router} = require('express');
const userRouter = Router();


userRouter.get("/",  userController.getUser);
userRouter.get("/:id", userController.getSingleUser);
userRouter.post("/addUser", userController.postUser);
userRouter.patch("/:id", userController.patchUser);
userRouter.delete("/:id", userController.deleteUser)
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);



module.exports = userRouter;