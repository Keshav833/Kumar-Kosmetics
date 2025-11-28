import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [6, "Password must be at least 6 characters long"],
		},
		cartItems: [
			{
				quantity: {
					type: Number,
					default: 1,
				},
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
				},
			},
		],
		role: {
			type: String,
			enum: ["customer", "admin"],
			default: "customer",
		},
        phone: {
            type: String,
            default: "",
        },
        avatar: {
            type: String,
            default: "",
        },
        addresses: [
            {
                fullName: String,
                phone: String,
                address: String,
                city: String,
                state: String,
                pincode: String,
                type: { type: String, default: "Home" }, // Home or Work
            }
        ],
        paymentMethods: [
            {
                type: { type: String, default: "UPI" },
                upiId: String,
                isDefault: { type: Boolean, default: false },
            }
        ],
        lastPasswordChange: {
            type: Date,
            default: Date.now,
        },
	},
	{
		timestamps: true,
	}
);

// Pre-save hook to hash password before saving to database
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		next(error);
	}
});

userSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;