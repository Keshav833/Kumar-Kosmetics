import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Eye, EyeOff, Check, X, ShieldCheck, AlertTriangle } from "lucide-react";

export default function ChangePassword({ onClose }) {
    const { changePassword, authUser } = useAuthStore();
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        logoutOthers: false,
    });
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [strength, setStrength] = useState(0);
    const [requirements, setRequirements] = useState({
        length: false,
        uppercase: false,
        number: false,
        symbol: false,
    });

    useEffect(() => {
        const password = formData.newPassword;
        const reqs = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /[0-9]/.test(password),
            symbol: /[^A-Za-z0-9]/.test(password),
        };
        setRequirements(reqs);

        let score = 0;
        if (reqs.length) score++;
        if (reqs.uppercase) score++;
        if (reqs.number) score++;
        if (reqs.symbol) score++;
        setStrength(score);
    }, [formData.newPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) return;
        
        const success = await changePassword({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
            logoutOthers: formData.logoutOthers
        });

        if (success && !formData.logoutOthers) {
            onClose();
        }
    };

    const getStrengthColor = () => {
        if (strength === 0) return "bg-gray-200";
        if (strength <= 2) return "bg-red-500";
        if (strength === 3) return "bg-yellow-500";
        return "bg-green-500";
    };

    const getStrengthText = () => {
        if (strength === 0) return "";
        if (strength <= 2) return "Weak";
        if (strength === 3) return "Medium";
        return "Strong";
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6 text-primary" />
                        Change Password
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-muted rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {authUser?.lastPasswordChange && (
                    <div className="bg-muted/50 p-3 rounded-lg mb-6 text-sm text-muted-foreground flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Last changed: {new Date(authUser.lastPasswordChange).toLocaleDateString()}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Current Password */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Current Password</label>
                        <div className="relative">
                            <input
                                type={showPassword.current ? "text" : "password"}
                                className="w-full p-3 border rounded-lg pr-10"
                                value={formData.currentPassword}
                                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-medium mb-1">New Password</label>
                        <div className="relative">
                            <input
                                type={showPassword.new ? "text" : "password"}
                                className="w-full p-3 border rounded-lg pr-10"
                                value={formData.newPassword}
                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        
                        {/* Strength Meter */}
                        <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-muted-foreground">Password Strength</span>
                                <span className={`font-medium ${
                                    strength <= 2 ? "text-red-500" : strength === 3 ? "text-yellow-500" : "text-green-500"
                                }`}>{getStrengthText()}</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full transition-all duration-300 ${getStrengthColor()}`} 
                                    style={{ width: `${(strength / 4) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            {[
                                { key: 'length', label: '8+ Characters' },
                                { key: 'uppercase', label: 'Uppercase Letter' },
                                { key: 'number', label: 'Number' },
                                { key: 'symbol', label: 'Symbol' },
                            ].map((req) => (
                                <div key={req.key} className={`flex items-center gap-1.5 text-xs ${
                                    requirements[req.key] ? "text-green-600" : "text-muted-foreground"
                                }`}>
                                    {requirements[req.key] ? <Check className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-current" />}
                                    {req.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showPassword.confirm ? "text" : "password"}
                                className="w-full p-3 border rounded-lg pr-10"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {formData.confirmPassword && (
                            <div className={`mt-1 text-xs flex items-center gap-1 ${
                                formData.newPassword === formData.confirmPassword ? "text-green-600" : "text-red-500"
                            }`}>
                                {formData.newPassword === formData.confirmPassword ? (
                                    <><Check className="w-3 h-3" /> Passwords match</>
                                ) : (
                                    <><X className="w-3 h-3" /> Passwords do not match</>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Logout Option */}
                    <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <input
                            type="checkbox"
                            id="logoutOthers"
                            checked={formData.logoutOthers}
                            onChange={(e) => setFormData({ ...formData, logoutOthers: e.target.checked })}
                            className="mt-1"
                        />
                        <label htmlFor="logoutOthers" className="text-sm cursor-pointer">
                            <span className="font-medium block text-foreground">Log out of all devices</span>
                            <span className="text-muted-foreground">You will be required to log in again.</span>
                        </label>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={strength < 3 || formData.newPassword !== formData.confirmPassword}
                            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                        >
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
