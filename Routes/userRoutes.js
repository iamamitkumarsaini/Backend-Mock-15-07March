const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Model/userModel");
const saltRounds = 4;

const userRoutes = express.Router();


userRoutes.post("/register",async(req,res) => {

    const { name, email, password, isAdmin } = req.body;
    console.log(name,email,password, isAdmin);

    const userEmail = await UserModel.findOne({email});
    console.log("userEmail", userEmail);

    if(userEmail){
        res.status(403).send({"Message":"This Email is already registered"})
    }
    else{
        try {
            bcrypt.hash(password,saltRounds, async(err, myPassword) => {

                const user = new UserModel({name,email,password:myPassword,isAdmin});
                await user.save();
                res.status(200).send({"Message":"Signup Successful"});
            })
            
        } 
        
        catch (err) {
            console.log(err);
            res.status(500).send({"Message":"Signup failed, try again later"});
        }
    }
})


userRoutes.post("/login", async(req,res) => {

    try {
        
        const { email, password } = req.body;
        const byEmail = await UserModel.find({email});
        console.log("byEmail",byEmail);

        if(byEmail.length>0){
            const myPassword = byEmail[0].password;
            bcrypt.compare(password,myPassword,(err, result) => {
                if(result){
                    const token = jwt.sign({"userID":byEmail[0]._id}, process.env.secret_key,{expiresIn:"1d"})
                    res.status(200).send({"Message":"Sign-In Successful",token, "profile":byEmail})
                }
                else{
                    res.status(401).send({"Message":"Invalid Login Credentials"});
                }
            })
        }
        else{
            res.status(404).send({"Message":"User not found"});
        }
    } 
    
    catch (err) {
        console.log(err);
        res.status(500).send({"Message":"Login Failed. try again later"})
    }
});



module.exports = { userRoutes };