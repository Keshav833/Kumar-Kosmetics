import mongoose from "mongoose";

const returnSchema = new mongoose.Schema(
	{
		orderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order",
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		items: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				name: { type: String, required: true },
				quantity: { type: Number, required: true },
				price: { type: Number, required: true },
				image: { type: String, required: true },
			},
		],
		reason: {
			type: String,
			required: true,
			enum: [
				"Damaged product",
				"Wrong item received",
				"Skin reaction / allergy",
				"Not as expected",
				"Other",
			],
		},
		description: {
			type: String,
			required: function () {
				return this.reason === "Other";
			},
		},
        type: {
            type: String,
            enum: ["Refund", "Replace"],
            default: "Refund" // MVP
        },
		status: {
			type: String,
			enum: [
				"Return Requested",
				"Pickup Scheduled",
				"Product Picked Up",
				"Quality Check",
				"Refund Initiated",
				"Refund Completed",
				"Rejected",
			],
			default: "Return Requested",
		},
		images: [
			{
				type: String, // URL
			},
		],
		refundMethod: {
			type: String,
			default: "Original Payment Method",
		},
        adminComments: {
            type: String
        }
	},
	{ timestamps: true }
);

const Return = mongoose.model("Return", returnSchema);

export default Return;
