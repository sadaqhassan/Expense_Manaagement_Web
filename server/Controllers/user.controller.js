// register_User
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../Models/user.model.js";

export const registerUser = async (req, res) => {
   const { name, email, password } = req.body;

   try {
      // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({success:false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let role;
    if (email === "sadaqsamo@gmail.com"){
        role = "admin";
    }else{
        role = "user";
    }
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role
    });
    await newUser.save();
    return res.status(201).json({success:true, message: "User created successfully" });
}catch (error) {
    return res.status(500).json({success:false, message: "Server error"+error.message });
    console.log("Error registering user:", error);
}
}


//login

export const loginUser = async (req, res) => {
    const { email, password } = req.body;  

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({success:false, message: "invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({success:false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const { password: _, ...userData } = user._doc; // Exclude password from user data  
        return res.status(200).json({success:true, message: "User logged in successfully", user: userData }).cookie("accessToken", token, { httpOnly: true });
    } catch (error) {
        return res.status(500).json({success:false, message: "Server error"+error.message });
        console.log("Error logging in user:", error);
    }
}