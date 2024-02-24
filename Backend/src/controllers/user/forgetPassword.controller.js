import { User } from "../../models/user.model.js";
import { bcryptHashPassword } from "../../utils/bcryptHashing.js";

export const forgotPassword = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;

       
        if (!email || !newPassword || !answer) {
            return res.status(400).json({
                success: false,
                message: "All credentials are required."
            });
        }

       
        const user = await User.findOne({ email, answer });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found or incorrect answer."
            });
        }

        
        const hashPassword = await bcryptHashPassword(newPassword);
        
       
        await User.findByIdAndUpdate(user._id, { password: hashPassword });

       
        res.status(200).json({
            success: true,
            message: "Password reset successfully."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while resetting the password."
        });
    }
};
