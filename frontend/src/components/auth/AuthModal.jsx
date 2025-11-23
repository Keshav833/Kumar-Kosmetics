import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import LoginForm from "./login-form";
import SignupForm from "./signup-form";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authUser } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (authUser) {
      closeAuthModal();
    }
  }, [authUser, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute right-4 top-4 p-2 hover:bg-muted rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-muted-foreground text-sm">
              {isLogin
                ? "Enter your details to access your account"
                : "Join us to unlock exclusive features"}
            </p>
          </div>

          {isLogin ? <LoginForm /> : <SignupForm />}

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-medium hover:underline focus:outline-none"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
