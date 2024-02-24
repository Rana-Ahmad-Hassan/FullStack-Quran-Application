import { User } from "../../models/user.model.js";
import { bcryptHashPassword } from "../../utils/bcryptHashing.js";

export const registerController = async (req, res) => {
    try {
        const { firstName, lastName, email, password, location,answer } = req.body;
        if (!firstName || !lastName || !email || !password || !location || !answer) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                message: "User is already registered"
            });
        }

        const encryptedPassword = await bcryptHashPassword(password);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: encryptedPassword,
            location,
            answer
        });

        res.status(201).json({
            success: true, 
            user: {
                id: user._id,
                email: user.email,
                firstName:user.firstName,
                lastName:user.lastName
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: "Error registering user"
        });
    }
};
