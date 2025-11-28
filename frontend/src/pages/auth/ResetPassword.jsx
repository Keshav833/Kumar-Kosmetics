import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Loader, Lock, Eye, EyeOff } from "lucide-react";
import axios from "../../lib/axios";
import toast from "react-hot-toast";

const ResetPassword = () => {
	const [passwords, setPasswords] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
    
    const location = useLocation();
    const navigate = useNavigate();
    const { email, otp } = location.state || {};

    useEffect(() => {
        if (!email || !otp) {
            navigate("/forgot-password");
        }
    }, [email, otp, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            return toast.error("Passwords do not match");
        }
        if (passwords.newPassword.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }

		setLoading(true);
		try {
			await axios.post("/auth/reset-password", { email, otp, newPassword: passwords.newPassword });
			toast.success("Password reset successfully! Please login.");
            navigate("/login");
		} catch (error) {
			toast.error(error.response?.data?.message || "Error resetting password");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-md'>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-emerald-400'>
					Reset Password
				</h2>
                <p className="mt-2 text-center text-sm text-gray-400">
                    Create a new password for your account
                </p>
			</div>

			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					<form className='space-y-6' onSubmit={handleSubmit}>
						<div>
							<label htmlFor='newPassword' className='block text-sm font-medium text-gray-300'>
								New Password
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='newPassword'
									type={showPassword ? "text" : "password"}
									required
									value={passwords.newPassword}
									onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
									className='block w-full pl-10 pr-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
									placeholder='••••••••'
								/>
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
							</div>
						</div>

                        <div>
							<label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-300'>
								Confirm Password
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='confirmPassword'
									type={showPassword ? "text" : "password"}
									required
									value={passwords.confirmPassword}
									onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
									className='block w-full pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
									placeholder='••••••••'
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
									Resetting...
								</>
							) : (
								<>
									Set New Password <ArrowRight className='ml-2 h-5 w-5' aria-hidden='true' />
								</>
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
