import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Loader, Lock } from "lucide-react";
import axios from "../../lib/axios";
import toast from "react-hot-toast";

const VerifyOtp = () => {
	const [otp, setOtp] = useState("");
	const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    useEffect(() => {
        if (!email) {
            navigate("/forgot-password");
        }
    }, [email, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
        if (otp.length !== 6) {
            return toast.error("OTP must be 6 digits");
        }

		setLoading(true);
		try {
			await axios.post("/auth/verify-otp", { email, otp });
			toast.success("OTP verified successfully");
            navigate("/reset-password", { state: { email, otp } });
		} catch (error) {
			toast.error(error.response?.data?.message || "Invalid OTP");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-md'>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-emerald-400'>
					Verify OTP
				</h2>
                <p className="mt-2 text-center text-sm text-gray-400">
                    Enter the 6-digit code sent to {email}
                </p>
			</div>

			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					<form className='space-y-6' onSubmit={handleSubmit}>
						<div>
							<label htmlFor='otp' className='block text-sm font-medium text-gray-300'>
								OTP Code
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='otp'
									type='text'
									required
                                    maxLength={6}
									value={otp}
									onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
									className='block w-full pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm tracking-widest text-center text-xl'
									placeholder='123456'
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
									Verifying...
								</>
							) : (
								<>
									Verify OTP <ArrowRight className='ml-2 h-5 w-5' aria-hidden='true' />
								</>
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default VerifyOtp;
