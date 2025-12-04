const { HttpStatusCode } = require('axios');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const registerUser = async (req, res,next) => {

    try {
        const { name,phone, email, password, role } = req.body;
            if(!name || !phone || !email || !password || !role){
                return res.status(400).json({message: "All fields are required"});
            }

            const isUserExist = await userModel.findOne({email});
            if(isUserExist){
                return res.status(409).json({message: "User already exists"});
            }

            const hashedPassword = await bcrypt.hash(password,10);

            const user = {
                name,
                phone,
                email,
                password: hashedPassword,
                role
            };
            const newUser = userModel(user);
            await newUser.save();
            res.status(201).json({message: "User registered successfully", data: newUser});
            console.log(newUser);

    } catch (error) {
        next(error);
    }



}



const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

      
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

       
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, 
            sameSite: "none",
            secure: true
        });

      
        res.status(200).json({
            message: "User logged in successfully",
            data: user,
            token
        });
        console.log(user);

    } catch (error) {
        next(error);
    }
};

function logoutUser(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true  
  });
  
  return res.status(200).json({
    message: "User logged out successfully",
  });
}

const getUserData = async (req,res,next) => {
    try{
        const user = await userModel.findById(req.user._id);
       if(user){
        res.status(200).json({message: "User data fetched successfully", data: user});
       }
    }catch(error){
        next(error);
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserData
}