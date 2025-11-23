import jwt from "jsonwebtoken";
import User from "../models/Users.model.js";

export const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ message: "Unauthorized - No Token Provided" });
		}

		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		if (!decoded) {
			return res.status(401).json({ message: "Unauthorized - Invalid Token" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const adminRoute = (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		return res.status(403).json({ message: "Access denied - Admin only" });
	}
};
