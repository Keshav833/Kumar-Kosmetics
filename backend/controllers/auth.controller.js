import { generateTokenAndSetCookie } from "../lib/generateToken.js";
import jwt from "jsonwebtoken";
import User from "../models/Users.model.js";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import OTP from "../models/otp.model.js";
import { sendEmail } from "../utils/emailSender.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const signup = async (req, res) => {
	const { email, password, name } = req.body;
	try {
		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}
		const user = await User.create({ name, email, password });
		const token = generateTokenAndSetCookie(user._id, res, user.role);
        
        user.activeToken = token;
        await user.save();

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
            avatar: user.avatar,
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

            const token = generateTokenAndSetCookie(adminUser._id, res, "admin");
            adminUser.activeToken = token;
            await adminUser.save();
            
            return res.json({
                _id: adminUser._id,
                name: adminUser.name,
                email: adminUser.email,
                role: adminUser.role,
                avatar: adminUser.avatar,
            });
        }

		const user = await User.findOne({ email });

		if (user && (await user.comparePassword(password))) {
			const token = generateTokenAndSetCookie(user._id, res, user.role);
            user.activeToken = token;
            await user.save();

			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
                avatar: user.avatar,
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
        const token = req.cookies.jwt;
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                if (decoded && decoded.userId) {
                    await User.findByIdAndUpdate(decoded.userId, { activeToken: null });
                }
            } catch (err) {
                // Token invalid or expired, just ignore and clear cookie
            }
        }

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

        // Extract Google profile picture and upgrade quality
        let googleAvatar = picture || null;
        if (googleAvatar && googleAvatar.includes("s96-c")) {
            googleAvatar = googleAvatar.replace("s96-c", "s256-c");
        }

		let user = await User.findOne({ email });

		if (!user) {
			user = await User.create({
				name,
				email,
				password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10), // Random password for google users
				role: "customer",
                avatar: googleAvatar || "",
			});
		} else {
            // If user exists, update avatar only if missing
            if (!user.avatar && googleAvatar) {
                user.avatar = googleAvatar;
                await user.save();
            }
        }

		const tokenJwt = generateTokenAndSetCookie(user._id, res, user.role);
        user.activeToken = tokenJwt;
        await user.save();

		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
            avatar: user.avatar,
		});
	} catch (error) {
		console.log("Error in googleLogin controller", error.message);
		res.status(500).json({ message: "Google login failed", error: error.message });
	}
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Hash OTP
        const hashedOtp = await bcrypt.hash(otp, 10);

        // Save to DB (delete old OTPs for this email first)
        await OTP.deleteMany({ email });
        await OTP.create({ email, otp: hashedOtp });

        // Send Email
        await sendEmail(email, "Password Reset OTP", `Your OTP for password reset is: ${otp}. It expires in 5 minutes.`);

        res.json({ message: "OTP sent to your email" });
    } catch (error) {
        console.log("Error in forgotPassword", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        const otpRecord = await OTP.findOne({ email });

        if (!otpRecord) {
            return res.status(400).json({ message: "OTP expired or invalid" });
        }

        const isMatch = await bcrypt.compare(otp, otpRecord.otp);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        res.json({ message: "OTP verified successfully" });
    } catch (error) {
        console.log("Error in verifyOtp", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        // Verify OTP again for security
        const otpRecord = await OTP.findOne({ email });
        if (!otpRecord) {
            return res.status(400).json({ message: "OTP expired or invalid" });
        }

        const isMatch = await bcrypt.compare(otp, otpRecord.otp);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Update User Password
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.password = newPassword; // Will be hashed by pre-save hook
        user.lastPasswordChange = Date.now();
        await user.save();

        // Delete OTP
        await OTP.deleteMany({ email });

        res.json({ message: "Password reset successfully" });
    } catch (error) {
        console.log("Error in resetPassword", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "customer" }).select("-password");
        res.json(users);
    } catch (error) {
        console.error("Error in getAllUsers controller", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateSkinProfile = async (req, res) => {
    try {
        const { skinType, concerns, allergies } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.skinProfile = {
            skinType,
            concerns,
            allergies,
            lastupdated: new Date()
        };

        await user.save();
        res.json({ message: "Skin profile updated successfully", skinProfile: user.skinProfile });
    } catch (error) {
        console.error("Error in updateSkinProfile", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};