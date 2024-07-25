const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");

const userController = {
    getUser:async(req,res)=>{
        try {
            const user = await userModel.find();
            return res.status(200).send({message :"users", user})
        } catch (error) {
            return res.status(500).send({message :error.message, error});
        }
    },

    getSingleUser:async(req,res)=>{
        try {
            const user = await userModel.findById(req.params.id);
            return res.status(200).send({message :"single user", user})
        } catch (error) {
            return res.status(500).send({message :error.message, error});
        }
    },

    postUser:async(req,res)=>{
        try {
            const user = await userModel.create(req.body);
            return res.status(200).send({message :"post user", user})
        } catch (error) {
            return res.status(500).send({message :error.message, error});
        }
    },

    deleteUser:async(req,res)=>{
        try {
            const user = await userModel.findByIdAndDelete(req.params.id);
            return res.status(200).send({message :"users", user})
        } catch (error) {
            return res.status(500).send({message :error.message, error});
        }
    },

    patchUser:async(req,res)=>{
        try {
            const user = await userModel.findByIdAndUpdate(req.params.id, req.body,{new:true});
            return res.status(200).send({message :"users", user})
        } catch (error) {
            return res.status(500).send({message :"error message", error});
        }
    },
    register:async(req,res)=>{
        let {name, email, password} = req.body;
        const user =await userModel.findOne({email});
        if(user){
            return res.status(400).send({message:"user already exist"})
        }
        else{
            bcrypt.hash(password, 8, function(err, hashPassword) {
                if(err){
                    return res.status(500).send({message:"Sign up failed, please try again later"})
                }
                const user = new userModel(
                    { 
                      name,
                      email,
                      password:hashPassword,
                    })
                 user.save()
                return res.status(200).send( {user,message:"Sign up successful"})
            });
        }
    },
    login:async(req,res)=>{
        const {email,password} = req.body;   
        const user = await userModel.findOne({email});
        if(!user){
           return res.status(500).send({ message:"invalid email or password "}) 
        }
         bcrypt.compare(password, user.password, function(err, result){
            if(err){
              return  res.status(401).send({message:"please try agin later"})
            }
            if(result == true){
                var token = jwt.sign({ email:user.email, id:user.id }, "saikiranjwtkey");
               return res.status(200).send({status:200, message:"login success",token:token, name:user.name, id:user.id})
            }
            else{
               return res.status(500).send({message:"invalid login credentials"})
            }
        })
    }
}


module.exports = userController;