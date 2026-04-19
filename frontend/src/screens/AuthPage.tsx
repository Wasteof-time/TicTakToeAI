"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Chrome } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const { login } = useAuthStore();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (isSignUp && !formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate auth
    login({
      id: '1',
      username: formData.username || formData.email.split('@')[0],
      email: formData.email,
      isGuest: false,
    });
    router.push('/');
  };

  const handleGoogleSignIn = () => {
    login({
      id: 'google-1',
      username: 'GooglePlayer',
      email: 'player@gmail.com',
      isGuest: false,
    });
    router.push('/');
  };

  const handleGuestPlay = () => {
    login({
      id: 'guest-1',
      username: 'GuestPlayer',
      email: 'guest@t3online.com',
      isGuest: true,
    });
    router.push('/');
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Left Side - Visual (hidden on mobile) */}
      <div
        className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: 'url(/images/bg_menu.jpg)' }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--bg-primary)', opacity: 0.7 }} />

        {/* Animated Floating Symbols */}
        <div className="relative z-10 text-center">
          <motion.div
            className="text-8xl font-bold mb-4"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              color: 'var(--accent-primary)',
              textShadow: '0 0 30px var(--accent-primary)',
            }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            T&#x00B3;
          </motion.div>
          <p
            className="text-xl tracking-widest"
            style={{ color: 'var(--text-secondary)' }}
          >
            THE ULTIMATE STRATEGY ARENA
          </p>

          {/* Floating X and O */}
          <motion.div
            className="absolute -top-20 -left-20 text-6xl font-bold opacity-30"
            style={{
              color: 'var(--accent-primary)',
              fontFamily: 'Orbitron',
            }}
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            X
          </motion.div>
          <motion.div
            className="absolute -bottom-16 -right-16 text-6xl font-bold opacity-30"
            style={{
              color: 'var(--accent-secondary)',
              fontFamily: 'Orbitron',
            }}
            animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            O
          </motion.div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <span
              className="text-5xl font-bold"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                color: 'var(--accent-primary)',
                textShadow: '0 0 20px var(--accent-primary)',
              }}
            >
              T&#x00B3;
            </span>
          </div>

          {/* Auth Card */}
          <div
            className="rounded-3xl p-8"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
            }}
          >
            {/* Tabs */}
            <div
              className="flex rounded-xl p-1 mb-8"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            >
              <button
                onClick={() => setIsSignUp(false)}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: !isSignUp ? 'var(--accent-primary)' : 'transparent',
                  color: !isSignUp ? 'var(--bg-primary)' : 'var(--text-secondary)',
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: isSignUp ? 'var(--accent-primary)' : 'transparent',
                  color: isSignUp ? 'var(--bg-primary)' : 'var(--text-secondary)',
                }}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        style={{ color: 'var(--text-secondary)' }}
                      />
                      <input
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                        style={{
                          backgroundColor: 'var(--bg-tertiary)',
                          border: `1px solid ${errors.username ? 'var(--danger)' : 'var(--border-color)'}`,
                          color: 'var(--text-primary)',
                        }}
                      />
                    </div>
                    {errors.username && (
                      <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>
                        {errors.username}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-secondary)' }}
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    border: `1px solid ${errors.email ? 'var(--danger)' : 'var(--border-color)'}`,
                    color: 'var(--text-primary)',
                  }}
                />
              </div>
              {errors.email && (
                <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>
                  {errors.email}
                </p>
              )}

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-secondary)' }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    border: `1px solid ${errors.password ? 'var(--danger)' : 'var(--border-color)'}`,
                    color: 'var(--text-primary)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>
                  {errors.password}
                </p>
              )}

              <AnimatePresence mode="wait">
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative">
                      <Lock
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        style={{ color: 'var(--text-secondary)' }}
                      />
                      <input
                        type="password"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                        style={{
                          backgroundColor: 'var(--bg-tertiary)',
                          border: `1px solid ${errors.confirmPassword ? 'var(--danger)' : 'var(--border-color)'}`,
                          color: 'var(--text-primary)',
                        }}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>
                        {errors.confirmPassword}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--bg-primary)',
                }}
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-color)' }} />
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                or continue with
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-color)' }} />
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              <Chrome size={18} />
              Sign in with Google
            </button>

            {/* Guest Mode */}
            <button
              onClick={handleGuestPlay}
              className="w-full mt-3 py-3 text-xs font-medium transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              Play as Guest
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
