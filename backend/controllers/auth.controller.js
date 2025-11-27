import { generateTokenAndSetCookie } from "../lib/generateToken.js";
import User from "../models/Users.model.js";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const signup = async (req, res) => {
	const { email, password, name } = req.body;
	try {
		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}
		const user = await User.create({ name, email, password });
		generateTokenAndSetCookie(user._id, res);

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
		});
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ message: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

        // Check for Admin Credentials
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            let adminUser = await User.findOne({ email });
            
            if (!adminUser) {
                // Create admin user if not exists
                adminUser = await User.create({
                    name: "Admin",
                    email: email,
                    password: await bcrypt.hash(password, 10), // Hash the env password for DB storage consistency
                    role: "admin"
                });
            } else if (adminUser.role !== "admin") {
                // Ensure role is admin
                adminUser.role = "admin";
                await adminUser.save();
            }

            generateTokenAndSetCookie(adminUser._id, res);
            
            return res.json({
                _id: adminUser._id,
                name: adminUser.name,
                email: adminUser.email,
                role: adminUser.role,
            });
        }

		const user = await User.findOne({ email });

		if (user && (await user.comparePassword(password))) {
			generateTokenAndSetCookie(user._id, res);

			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			});
		} else {
			res.status(400).json({ message: "Invalid email or password" });
		}
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ message: error.message });
	}
};

export const logout = async (req, res) => {
	try {
		res.cookie("jwt", "", {
			maxAge: 0,
		});
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getProfile = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const googleLogin = async (req, res) => {
	try {
		const { token } = req.body;
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID,
		});
		const { name, email, picture } = ticket.getPayload();

		let user = await User.findOne({ email });

		if (!user) {
			user = await User.create({
				name,
				email,
				password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10), // Random password for google users
				role: "customer",
			});
		}

		generateTokenAndSetCookie(user._id, res);

		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
		});
	} catch (error) {
		console.log("Error in googleLogin controller", error.message);
		res.status(500).json({ message: "Google login failed", error: error.message });
	}
};