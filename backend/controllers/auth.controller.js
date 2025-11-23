
import User from "../models/Users.model.js"

export const signup = async (req,res) =>{
    const {email, password , name} = req.body;
    try{
        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({message: "user already exists"});
        }
        const user = await User.create({name , email, password});
        res.status(201).json({user, message : "User created Successfully"});

    }catch(error){
        res.status(500).json({message: error.message});
    }
    
}
export const login = async (req,res) =>{
    res.send("login route called")
}
export const logout = async (req,res) =>{
    res.send("logout route called")
}