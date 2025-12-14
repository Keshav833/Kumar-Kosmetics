import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
		pincode: "",
		phone: "",
	});
	const { cart, getCart, clearCart } = useCartStore();
	const navigate = useNavigate();
    const location = useLocation();

    const [couponCode, setCouponCode] = useState(location.state?.couponCode || "");
    const [isCouponApplied, setIsCouponApplied] = useState(location.state?.isCouponApplied || false);
    const [discount, setDiscount] = useState(location.state?.discount || 0);

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
    // Calculate inclusive total from items
	const calculatedInclusiveSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Reverse GST Calculation: Product Price includes 18% GST
	const tax = Math.round(calculatedInclusiveSubtotal - (calculatedInclusiveSubtotal / 1.18));
    const subtotal = calculatedInclusiveSubtotal - tax; // Base Price
    
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
	const shipping = calculatedInclusiveSubtotal > 1500 ? 0 : totalQuantity * 50;
    
    // Recalculate total with discount
	const total = calculatedInclusiveSubtotal + shipping - discount;

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        try {
            const res = await axiosInstance.post("/cart/validate-coupon", { code: couponCode });
            if (res.data.valid) {
                setIsCouponApplied(true);
                if (res.data.type === 'free_delivery') {
                    if (shipping > 0) {
                        setDiscount(shipping);
                        toast.success(res.data.message);
                    } else {
                        toast.success("Free delivery already applied on orders above ₹1500!");
                        // Still mark as applied but discount is 0 effectively (or we can set it to shipping which is 0)
                        setDiscount(0);
                    }
                }
            }
        } catch (error) {
            console.error("Coupon error:", error);
            toast.error(error.response?.data?.message || "Invalid Coupon Code");
            setIsCouponApplied(false);
            setDiscount(0);
        }
    };
    
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
								subtotal={subtotal}
								tax={tax}
								shipping={shipping}
								total={total}
                                discount={discount}
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
                                couponCode={isCouponApplied ? couponCode : null}
                                discountAmount={discount}
							/>
						</div>
						<aside className="lg:col-span-1">
							<OrderReview
								items={cartItems}
								subtotal={subtotal}
								tax={tax}
								shipping={shipping}
								total={total}
                                discount={discount}
							/>
						</aside>
					</div>
				)}
			</section>

			<Footer />
		</main>
	);
}

function PaymentForm({ orderData, total, cartItems, onSuccess, onBack, couponCode, discountAmount }) {
	const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("Online"); // Default to Online for better UX
    const { clearCart } = useCartStore();
    const navigate = useNavigate();

	const handlePayment = async () => {
        setLoading(true);
		try {
            if (paymentMethod === "COD") {
                // Create Order in Backend for COD
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
            } else {
                // Online Payment Flow
                // 1. Get Razorpay Key
                const { data: { key } } = await axiosInstance.get("/payment/get-key");

                // 2. Create Order in Backend (Razorpay Order)
                const { data: { order } } = await axiosInstance.post("/payment/create-order", {
                    amount: total
                });

                // 3. Initialize Razorpay Options
                const options = {
                    key: key,
                    amount: order.amount,
                    currency: "INR",
                    name: "Kumar Kosmetics",
                    description: "Payment for your order",
                    image: "/KKLogo.png", // Ensure this path is correct
                    order_id: order.id,
                    callback_url: "http://localhost:5000/api/payment/verify-payment", // Fallback if handler fails, but we use handler
                    handler: async function (response) {
                        // 4. Verify Payment
                        // We need to create the actual order in our DB first or update it. 
                        // The current backend flow for `verifyPayment` expects an `orderId` to update status.
                        // However, we haven't created the order in our DB yet, only in Razorpay.
                        // Strategy: Create the order in DB *before* or *after* payment?
                        // User flow says: Backend creates order -> Razorpay opens.
                        // Let's create the order in our DB with status "Pending" first, then update it.
                        
                        // Actually, looking at `verifyPayment` controller:
                        // if(orderId){ const order = await Order.findById(orderId); ... }
                        // So we need an orderId.
                        
                        // Let's create the order in DB first as "Pending"
                        try {
                             const dbOrderRes = await axiosInstance.post("/orders", {
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
                                paymentMethod: "Online",
                                paymentStatus: "Pending", // Initial status
                                couponCode: couponCode,
                                discountAmount: discountAmount
                            });

                            if (dbOrderRes.status === 201) {
                                const orderId = dbOrderRes.data._id; // Assuming backend returns the created order object
                                await onSuccess(response, orderId);
                            }
                        } catch (err) {
                            console.error("Failed to create local order:", err);
                            toast.error("Failed to create order record.");
                        }
                    },
                    prefill: {
                        name: `${orderData.firstName} ${orderData.lastName}`,
                        email: orderData.email,
                        contact: orderData.phone
                    },
                    notes: {
                        address: orderData.address
                    },
                    theme: {
                        color: "#3399cc"
                    }
                };

                const rzp1 = new window.Razorpay(options);
                rzp1.open();
            }

		} catch (error) {
			console.error("Order placement error:", error);
            if (error.response) {
                console.error("Server response:", error.response.data);
                toast.error(error.response.data.message || "Failed to place order");
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
                <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'Online' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary'}`}>
                    <input type="radio" name="payment" checked={paymentMethod === 'Online'} onChange={() => setPaymentMethod('Online')} className="w-4 h-4" />
                    <span className="font-medium text-foreground">Online Payment (Razorpay)</span>
                </label>
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
