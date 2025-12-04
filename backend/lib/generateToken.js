import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
		httpOnly: true, // prevent XSS attacks
		sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
		secure: process.env.NODE_ENV !== "development",
	});

	return token;
};
