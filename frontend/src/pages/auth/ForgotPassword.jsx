import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { ArrowRight, Mail, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../lib/axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await axios.post("/auth/forgot-password", { email });
			toast.success("OTP sent to your email");
            // Pass email to next page via state
            navigate("/verify-otp", { state: { email } });
		} catch (error) {
			toast.error(error.response?.data?.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-md'>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-emerald-400'>
					Forgot Password
				</h2>
                <p className="mt-2 text-center text-sm text-gray-400">
                    Enter your email address and we'll send you an OTP to reset your password.
                </p>
			</div>

			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					<form className='space-y-6' onSubmit={handleSubmit}>
						<div>
							<label htmlFor='email' className='block text-sm font-medium text-gray-300'>
								Email address
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Mail className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='email'
									type='email'
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='block w-full pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
									placeholder='you@example.com'
								/>
							</div>
						</div>

						<button
							type='submit'
							disabled={loading}
							className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50'
						>
							{loading ? (
								<>
									<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
									Sending OTP...
								</>
							) : (
								<>
									Send OTP <ArrowRight className='ml-2 h-5 w-5' aria-hidden='true' />
								</>
							)}
						</button>
					</form>
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-700" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-800 text-gray-400">
                                    Remember your password?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-3">
                            <Link
                                to='/login'
                                className='w-full flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out'
                            >
                                Back to Login
                            </Link>
                        </div>
                    </div>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
