import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res, role = "customer") => {
    const isAdmin = role === "admin";
    const expiresIn = isAdmin ? "1h" : "15d"; // Admin session 1 hour, User 15 days
    const maxAge = isAdmin ? 60 * 60 * 1000 : 15 * 24 * 60 * 60 * 1000;

	const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: expiresIn,
	});

	res.cookie("jwt", token, {
		maxAge: maxAge,
		httpOnly: true, // prevent XSS attacks
		sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
		secure: process.env.NODE_ENV !== "development",
	});

	return token;
};
