import Order from "../models/Order.model.js";

export const createOrder = async (req, res) => {
	try {
		console.log("createOrder req.user:", req.user);
		console.log("createOrder req.body:", req.body);
		const { items, totalAmount, address, paymentMethod } = req.body;

		const newOrder = new Order({
			user: req.user._id,
			items,
			totalAmount,
			address,
			paymentMethod,
            paymentStatus: paymentMethod === "COD" ? "Pending" : "Pending",
		});

		const savedOrder = await newOrder.save();

		res.status(201).json(savedOrder);
	} catch (error) {
		console.log("Error in createOrder:", error);
		res.status(500).json({ message: "Server Error", error: error.message, details: error.errors });
	}
};

export const getUserOrders = async (req, res) => {
	try {
		const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
		res.json(orders);
	} catch (error) {
		console.log("Error in getUserOrders", error);
		res.status(500).json({ message: "Server Error", error: error.message });
	}
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.log("Error in getAllOrders", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status, trackingId, adminNotes } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (status) order.status = status;
        if (trackingId !== undefined) order.trackingId = trackingId;
        if (adminNotes !== undefined) order.adminNotes = adminNotes;
        
        await order.save();

        res.json(order);
    } catch (error) {
        console.log("Error in updateOrderStatus", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
