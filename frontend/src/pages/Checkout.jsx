import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CheckoutForm from "@/components/checkout/checkout-form";
import OrderReview from "@/components/cart/order-review";
import { useCartStore } from "@/store/useCartStore";
import axiosInstance from "@/lib/axios";
import { toast } from "react-hot-toast";

export default function Checkout() {
	const [step, setStep] = useState(1);
	const [orderData, setOrderData] = useState({
		email: "",
		firstName: "",
		lastName: "",
		address: "",
		city: "",
		state: "",
		pincode: "",
		phone: "",
	});

	const { cart, getCart, clearCart } = useCartStore();
	const navigate = useNavigate();

	useEffect(() => {
		getCart();
	}, [getCart]);

	const cartItems = cart?.items?.map(item => ({
        ...item,
        name: item.product.name,
        image: item.product.images?.[0] || "/placeholder.svg",
        price: item.product.price,
        id: item._id
    })) || [];
	const subtotal = cart?.subTotal || 0; // Assuming backend calculates this or we calculate it here
    // If backend doesn't send subTotal, calculate it:
    const calculatedSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
	const tax = Math.round(calculatedSubtotal * 0.18);
	const shipping = 100;
	const total = calculatedSubtotal + tax + shipping;

	const handleFormSubmit = (data) => {
		setOrderData(data);
		setStep(2);
	};

	const handlePaymentSuccess = async (response, orderId) => {
		try {
			const res = await axiosInstance.post("/payment/verify-payment", {
				razorpay_order_id: response.razorpay_order_id,
				razorpay_payment_id: response.razorpay_payment_id,
				razorpay_signature: response.razorpay_signature,
                orderId: orderId
			});

			if (res.data.success) {
				toast.success("Payment Successful!");
				clearCart();
				navigate("/order-success");
			} else {
				toast.error("Payment Verification Failed");
			}
		} catch (error) {
			console.error("Payment verification error:", error);
			toast.error("Payment Verification Failed");
		}
	};

	return (
		<main className="min-h-screen bg-background">
			<Header />

			<section className="max-w-7xl mx-auto px-4 py-12">
				{/* Progress */}
				<div className="mb-12">
					<div className="flex items-center justify-between mb-4">
						<h1 className="text-3xl font-light text-foreground">
							<span className="font-semibold">Checkout</span>
						</h1>
						<span className="text-sm text-muted-foreground">Step {step} of 2</span>
					</div>
					<div className="h-2 bg-muted rounded-full overflow-hidden">
						<div
							className="h-full bg-primary transition-all duration-300"
							style={{ width: `${(step / 2) * 100}%` }}
						/>
					</div>
				</div>

				{step === 1 && (
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2">
							<CheckoutForm onSubmit={handleFormSubmit} initialData={orderData} />
						</div>
						<aside className="lg:col-span-1">
							<OrderReview
								items={cartItems}
								subtotal={calculatedSubtotal}
								tax={tax}
								shipping={shipping}
								total={total}
							/>
						</aside>
					</div>
				)}

				{step === 2 && (
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2">
							<PaymentForm
								orderData={orderData}
								total={total}
								cartItems={cartItems}
								onSuccess={handlePaymentSuccess}
								onBack={() => setStep(1)}
							/>
						</div>
						<aside className="lg:col-span-1">
							<OrderReview
								items={cartItems}
								subtotal={calculatedSubtotal}
								tax={tax}
								shipping={shipping}
								total={total}
							/>
						</aside>
					</div>
				)}
			</section>

			<Footer />
		</main>
	);
}

function PaymentForm({ orderData, total, cartItems, onSuccess, onBack }) {
	const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const { clearCart } = useCartStore();
    const navigate = useNavigate();

	const handlePayment = async () => {
        setLoading(true);
		try {
            // Create Order in Backend
            const orderRes = await axiosInstance.post("/orders", {
                items: cartItems.map(item => ({
                    product: item.product._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    image: item.image,
                    variant: item.variant
                })),
                totalAmount: total,
                address: {
                    fullName: `${orderData.firstName} ${orderData.lastName}`,
                    phone: orderData.phone,
                    address: orderData.address,
                    city: orderData.city,
                    state: orderData.state,
                    pincode: orderData.pincode
                },
                paymentMethod: paymentMethod
            });

            if(orderRes.status === 201) {
                toast.success("Order Placed Successfully!");
                clearCart();
                navigate("/order-success");
            }
		} catch (error) {
			console.error("Order placement error:", error);
            if (error.response) {
                console.error("Server response:", error.response.data);
                toast.error(error.response.data.message || "Failed to place order");
                if (error.response.data.details) console.error("Validation details:", error.response.data.details);
            } else {
			    toast.error("Failed to place order");
            }
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-white rounded-2xl p-8 border border-border">
			<h2 className="text-2xl font-semibold text-foreground mb-6">Payment Method</h2>

			<div className="space-y-4 mb-8">
				<label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'COD' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary'}`}>
					<input type="radio" name="payment" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="w-4 h-4" />
					<span className="font-medium text-foreground">Cash on Delivery (COD)</span>
				</label>
                {/* Placeholder for future Online Payment */}
                <div className="p-4 border-2 border-border rounded-lg opacity-50 cursor-not-allowed">
                    <div className="flex items-center gap-3">
                        <input type="radio" name="payment" disabled className="w-4 h-4" />
                        <span className="font-medium text-foreground">Online Payment (Coming Soon)</span>
                    </div>
                </div>
			</div>

			<div className="space-y-4">
				<button
					onClick={handlePayment}
					disabled={loading}
					className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
				>
					{loading ? "Processing..." : `Place Order (₹${total})`}
				</button>
				<button
					onClick={onBack}
					className="w-full bg-muted text-foreground py-3 rounded-lg font-semibold hover:bg-border transition-colors"
				>
					Back
				</button>
			</div>
		</div>
	);
}
