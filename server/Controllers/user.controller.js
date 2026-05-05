// register_User
import bcrypt from "bcryptjs";
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