import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { GoogleLogin } from '@react-oauth/google';
import { Eye, EyeOff, Loader, ArrowRight, Mail, Lock } from 'lucide-react';
import axios from '../lib/axios';
import toast from 'react-hot-toast';
import Magnet from '../components/ui/Magnet';

export default function AuthPage() {
  const [mode, setMode] = useState('login'); // login, signup, forgot-password, verify-otp, reset-password
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });

  const { login, signup, googleLogin, loading: storeLoading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = formData.otp.split('');
    // Pad with empty strings if needed to ensure length
    while (newOtp.length < 6) newOtp.push('');
    
    newOtp[index] = value;
    const newOtpString = newOtp.join('').slice(0, 6);
    setFormData({ ...formData, otp: newOtpString });

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    // Backspace to previous
    if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Set initial mode based on URL
  useEffect(() => {
    const path = location.pathname;
    if (path === '/signup') setMode('signup');
    else if (path === '/login') setMode('login');
    else if (path === '/forgot-password') setMode('forgot-password');
    else if (path === '/verify-otp') setMode('verify-otp');
    else if (path === '/reset-password') setMode('reset-password');
    
    // Pre-fill email/otp if passed via state (navigation)
    if (location.state?.email) {
        setFormData(prev => ({ ...prev, email: location.state.email }));
    }
    if (location.state?.otp) {
        setFormData(prev => ({ ...prev, otp: location.state.otp }));
    }
  }, [location.pathname, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (mode === 'login') {
      await login({ email: formData.email, password: formData.password });
    } 
    else if (mode === 'signup') {
      await signup({ 
        name: formData.name, 
        email: formData.email, 
        password: formData.password 
      });
    }
    else if (mode === 'forgot-password') {
        setLoading(true);
        try {
            await axios.post("/auth/forgot-password", { email: formData.email });
            toast.success("OTP sent to your email");
            navigate("/verify-otp", { state: { email: formData.email } });
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }
    else if (mode === 'verify-otp') {
        if (formData.otp.length !== 6) return toast.error("OTP must be 6 digits");
        setLoading(true);
        try {
            await axios.post("/auth/verify-otp", { email: formData.email, otp: formData.otp });
            toast.success("OTP verified successfully");
            navigate("/reset-password", { state: { email: formData.email, otp: formData.otp } });
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    }
    else if (mode === 'reset-password') {
        if (formData.newPassword !== formData.confirmPassword) return toast.error("Passwords do not match");
        if (formData.newPassword.length < 6) return toast.error("Password must be at least 6 characters");
        
        setLoading(true);
        try {
            await axios.post("/auth/reset-password", { 
                email: formData.email, 
                otp: formData.otp, 
                newPassword: formData.newPassword 
            });
            toast.success("Password reset successfully! Please login.");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error resetting password");
        } finally {
            setLoading(false);
        }
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    if (credentialResponse.credential) {
      googleLogin(credentialResponse.credential);
    }
  };

  const toggleMode = (newPath) => {
    navigate(newPath);
    // Reset sensitive fields but keep email if useful? 
    // Actually better to clear mostly to avoid confusion
    if (newPath === '/login' || newPath === '/signup') {
        setFormData(prev => ({ ...prev, password: '', otp: '', newPassword: '', confirmPassword: '' }));
    }
  };

  const getTitle = () => {
      switch(mode) {
          case 'login': return 'LOGIN';
          case 'signup': return 'SIGN UP';
          case 'forgot-password': return 'FORGOT PASSWORD';
          case 'verify-otp': return 'VERIFY OTP';
          case 'reset-password': return 'RESET PASSWORD';
          default: return 'LOGIN';
      }
  };

  const getDescription = () => {
      switch(mode) {
          case 'login': return 'By accessing your Kumar Kosmetics Account you can track and manage your orders and also save multiple addresses.';
          case 'signup': return 'Create your Kumar Kosmetics Account to track orders, save addresses, and enjoy exclusive benefits.';
          case 'forgot-password': return "Enter your email address and we'll send you an OTP to reset your password.";
          case 'verify-otp': return `Enter the 6-digit code sent to ${formData.email || 'your email'}`;
          case 'reset-password': return 'Create a new password for your account';
          default: return '';
      }
  };

  const isLoading = loading || storeLoading;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 xl:w-2/5 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&h=1600&fit=crop&q=80"
          alt="Skincare product application"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/5"></div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 xl:w-3/5 flex flex-col bg-gray-50">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 md:px-30 md:py-4">
          <div className="w-28 sm:w-40 md:w-20">
            <Link to="/">
                <img 
                src="/kumarKosmetics.png"
                alt="Kumar Kosmetics"
                className="w-full h-auto"
                />
            </Link>
          </div>
          <Link to="/" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 whitespace-nowrap">
            Return to Store
          </Link>
        </div>

        {/* Form Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 pb-8">
          <div className="w-full max-w-md">
            {/* Title */}
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-3 sm:mb-4">
                {getTitle()}
              </h2>
              <p className="text-gray-400 text-xs sm:text-xs px-4">
                {getDescription()}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
              
              {mode === 'signup' && (
                <div>
                  <input
                    type="text"
                    placeholder="FULL NAME"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 sm:px-5 py-4 sm:py-3 bg-white border border-gray-200 rounded-full text-xs sm:text-xs font-semibold placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                    required
                  />
                </div>
              )}

              {(mode === 'login' || mode === 'signup' || mode === 'forgot-password') && (
                <div>
                  <input
                    type="email"
                    placeholder="ENTER YOUR EMAIL"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 sm:px-5 py-4 sm:py-3 bg-white border border-gray-200 rounded-full text-xs sm:text-xs font-semibold placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                    required
                  />
                </div>
              )}

              {(mode === 'login' || mode === 'signup') && (
                <div className="relative">
                    <input
                    type={showPassword ? "text" : "password"}
                    placeholder="PASSWORD"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 sm:px-5 py-4 sm:py-3 bg-white border border-gray-200 rounded-full text-xs sm:text-xs font-semibold placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                    required
                    />
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
              )}

              {mode === 'verify-otp' && (
                  <div className="flex gap-3 justify-center">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <input
                        key={index}
                        type="text"
                        maxLength={1}
                        ref={(el) => (inputRefs.current[index] = el)}
                        value={formData.otp[index] || ''}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        className="
                            w-12 h-12 
                            text-center text-xl font-semibold 
                            border border-gray-300 
                            rounded-xl 
                            outline-none
                            focus:border-indigo-500 
                            focus:ring-2 
                            focus:ring-indigo-300
                        "
                        />
                    ))}
                  </div>
              )}

              {mode === 'reset-password' && (
                  <>
                    <div className="relative">
                        <input
                        type={showPassword ? "text" : "password"}
                        placeholder="NEW PASSWORD"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                        className="w-full px-4 sm:px-5 py-4 sm:py-3 bg-white border border-gray-200 rounded-full text-xs sm:text-xs font-semibold placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                        required
                        />
                        <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    <div>
                        <input
                        type="password"
                        placeholder="CONFIRM NEW PASSWORD"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="w-full px-4 sm:px-5 py-4 sm:py-3 bg-white border border-gray-200 rounded-full text-xs sm:text-xs font-semibold placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                        required
                        />
                    </div>
                  </>
              )}

              {mode === 'login' && (
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-gray-800 focus:ring-gray-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-600">
                            Remember me
                        </label>
                    </div>
                    <Link to="/forgot-password" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 underline">
                        Forgot Password
                    </Link>
                </div>
              )}

              <div className="flex justify-center w-full">
                <Magnet padding={50} disabled={isLoading} magnetStrength={5}>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-2 sm:py-3 bg-gray-800 text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
                    >
                        {isLoading ? (
                            <Loader className="size-5 animate-spin" />
                        ) : (
                            mode === 'login' ? 'LOGIN' : 
                            mode === 'signup' ? 'SIGN UP' :
                            mode === 'forgot-password' ? 'SEND OTP' :
                            mode === 'verify-otp' ? 'VERIFY' : 'RESET PASSWORD'
                        )}
                    </button>
                </Magnet>
              </div>

              {(mode === 'login' || mode === 'signup') && (
                <>
                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                        <span className="bg-gray-50 px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => console.log('Login Failed')}
                            useOneTap
                            shape="circle"
                        />
                    </div>
                </>
              )}

            </form>

            {/* Toggle / Back Links */}
            <div className="text-center mt-6 sm:mt-8">
              {mode === 'login' && (
                  <>
                    <p className="text-gray-600 text-xs sm:text-sm">Don't Have an Account Already?</p>
                    <Link to="/signup" className="text-gray-900 text-sm sm:text-base font-medium underline hover:text-gray-700 mt-1 block">
                        Sign Up
                    </Link>
                  </>
              )}
              {mode === 'signup' && (
                  <>
                    <p className="text-gray-600 text-xs sm:text-sm">Already Have an Account?</p>
                    <Link to="/login" className="text-gray-900 text-sm sm:text-base font-medium underline hover:text-gray-700 mt-1 block">
                        Login
                    </Link>
                  </>
              )}
              {(mode === 'forgot-password' || mode === 'verify-otp' || mode === 'reset-password') && (
                  <Link to="/login" className="text-gray-900 text-sm sm:text-base font-medium underline hover:text-gray-700 mt-1">
                      Back to Login
                  </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
