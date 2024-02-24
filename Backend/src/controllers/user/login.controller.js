import { User } from "../../models/user.model.js";
import { compareBcryptPassword } from "../../utils/bcryptHashing.js";
import jwt from "jsonwebtoken";

export const loginController = async (req, res) => {
    const { email, password } = req.body;

   
    if (!email || !password) {
        return res.status(400).json({ 
            message: "All fields are required"
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "User is not registered"
            });
        }

        
        const comparePassword = await compareBcryptPassword(password, user.password);
        if (!comparePassword) {
            return res.status(401).json({ 
                message: "Invalid credentials."
            });
        }

       
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '2m' });

        
        res.status(200).json({
            message: "Login successful",
            token,
            user:{
              firstName:  user.firstName,
              lastName: user.lastName
            }
        });
    } catch (error) {
       
        console.error(error);
        res.status(500).json({
            message: "An error occurred during the login process."
        });
    }
};
