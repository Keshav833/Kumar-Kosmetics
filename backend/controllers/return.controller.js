import Return from "../models/Return.model.js";
import Order from "../models/Order.model.js";

// @desc    Request a return
// @route   POST /api/orders/:id/return
// @access  Private
export const requestReturn = async (req, res) => {
	try {
        const { reason, description, type, images, refundMethod } = req.body;
        const orderId = req.params.id;
        const userId = req.user._id;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Check if return already requested
        const existingReturn = await Return.findOne({ orderId });
        if (existingReturn) {
            return res.status(400).json({ message: "Return already requested for this order" });
        }

        if (order.status !== "Delivered") {
             return res.status(400).json({ message: "Order must be delivered to request a return" });
        }
        
        // In a real app, we would validate the return window here

        const returnRequest = await Return.create({
            orderId,
            userId,
            items: order.items, // MVP: All items
            reason,
            description,
            type,
            images,
            refundMethod
        });

        // Update Order status
        order.returnStatus = "Requested";
        await order.save();

		res.status(201).json(returnRequest);
	} catch (error) {
		console.log("Error in requestReturn controller", error.message);
		res.status(500).json({ message: "Server Error", error: error.message });
	}
};

// @desc    Get return status for an order
// @route   GET /api/orders/:id/return
// @access  Private
export const getReturnStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const returnRequest = await Return.findOne({ orderId });

        if (!returnRequest) {
            return res.status(404).json({ message: "Return not found" });
        }
        res.json(returnRequest);
    } catch (error) {
        console.log("Error in getReturnStatus controller", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// @desc    Get all returns (Admin)
// @route   GET /api/returns/admin
// @access  Private/Admin
export const getAllReturns = async (req, res) => {
    try {
        const returns = await Return.find()
            .populate("userId", "name email")
            .populate("orderId", "totalAmount items")
            .sort({ createdAt: -1 });

        res.json(returns);
    } catch (error) {
        console.log("Error in getAllReturns controller", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
