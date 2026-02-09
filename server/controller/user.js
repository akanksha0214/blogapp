const User = require("../model/user");

// CREATE USER
const postUser = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, email } = req.body;

        // ✅ Required fields validation
        if (!firstName || !lastName || !phoneNumber || !email) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // ✅ Phone number validation (10 digits only)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).json({
                success: false,
                message: "Phone number must be exactly 10 digits",
            });
        }

        // ✅ Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        }


        // ✅ Create user
        const user = await User.create({
            firstName,
            lastName,
            phoneNumber,
            email,
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });
    } catch (error) {
        console.error("Create User Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// UPDATE USER
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, phoneNumber, email } = req.body;

        // ✅ Required fields validation
        if (!firstName || !lastName || !phoneNumber || !email) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // ✅ Phone validation
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).json({
                success: false,
                message: "Phone number must be exactly 10 digits",
            });
        }

        // ✅ Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                firstName,
                lastName,
                phoneNumber,
                email,
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.error("Update User Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


// GET USER
const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
};

// DELETE USER
const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
};

//GET ALL USERS
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        console.error("Get All Users Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

module.exports = { postUser, getUser, deleteUser, updateUser, getAllUsers }