import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.model.js";

export const createCheckoutSession = async (req, res) => {
	try {
		const { amount } = req.body;

		const instance = new Razorpay({
			key_id: process.env.RAZORPAY_KEY_ID,
			key_secret: process.env.RAZORPAY_KEY_SECRET,
		});

		const options = {
			amount: amount * 100, // amount in smallest currency unit
			currency: "INR",
			receipt: `receipt_order_${Date.now()}`,
		};

		const order = await instance.orders.create(options);

		res.json({
			success: true,
			order,
		});
	} catch (error) {
		console.log("Error in createCheckoutSession", error);
		res.status(500).json({ message: "Server Error", error: error.message });
	}
};

export const verifyPayment = async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

		const body = razorpay_order_id + "|" + razorpay_payment_id;

		const expectedSignature = crypto
			.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
			.update(body.toString())
			.digest("hex");

		const isAuthentic = expectedSignature === razorpay_signature;

		if (isAuthentic) {
			// Update order status
            if(orderId){
                const order = await Order.findById(orderId);
                if(order){
                    order.paymentStatus = "Paid";
                    order.status = "Processing"; // Or Confirmed
                    order.razorpayPaymentId = razorpay_payment_id;
                    order.razorpayOrderId = razorpay_order_id;
                    await order.save();
                }
            }

			res.json({
				success: true,
				message: "Payment verified successfully",
			});
		} else {
			res.status(400).json({
				success: false,
				message: "Invalid signature",
			});
		}
	} catch (error) {
		console.log("Error in verifyPayment", error);
		res.status(500).json({ message: "Server Error", error: error.message });
	}
};

export const getRazorpayKey = async (req, res) => {
    res.json({ key: process.env.RAZORPAY_KEY_ID });
};
