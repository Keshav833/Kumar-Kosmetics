import User from "../models/Users.model.js";
import Order from "../models/Order.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const updateProfile = async (req, res) => {
	try {
		const { name, phone, avatar } = req.body;
		const user = await User.findById(req.user._id);

		if (name) user.name = name;
		if (phone) user.phone = phone;
        if (avatar) {
            // Upload to cloudinary if it's a base64 string (simple check)
            if (avatar.startsWith("data:image")) {
                try {
                    const uploadResponse = await cloudinary.uploader.upload(avatar);
                    user.avatar = uploadResponse.secure_url;
                } catch (error) {
                    console.log("Cloudinary upload error", error);
                }
            } else {
                 user.avatar = avatar;
            }
        }

		await user.save();
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const addAddress = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		user.addresses.push(req.body);
		await user.save();
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const deleteAddress = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		user.addresses = user.addresses.filter((addr) => addr._id.toString() !== req.params.id);
		await user.save();
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const addUPI = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		user.paymentMethods.push(req.body);
		await user.save();
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const deleteUPI = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		user.paymentMethods = user.paymentMethods.filter((pm) => pm._id.toString() !== req.params.id);
		await user.save();
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, logoutOthers } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect current password" });
        }

        const isSame = await user.comparePassword(newPassword);
        if (isSame) {
            return res.status(400).json({ message: "New password cannot be the same as old password" });
        }

        user.password = newPassword;
        user.lastPasswordChange = Date.now();
        await user.save();

        if (logoutOthers) {
            // In a real JWT setup with refresh tokens, you'd invalidate refresh tokens here.
            // Since we are using cookies, we can just clear the cookie on the response,
            // but that only logs out the CURRENT device.
            // To log out ALL devices, we would need a token versioning system or store active tokens in DB/Redis.
            // For this simple implementation, we will just clear the cookie on this response, 
            // effectively logging the user out of the current session as requested by "Force re-login".
             res.cookie("jwt", "", {
                maxAge: 0,
            });
        }

        res.json({ message: "Password updated successfully" });
    } catch (error) {
        console.log("Error in changePassword", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getOrders = async (req, res) => {
	try {
		const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
		res.json(orders);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
