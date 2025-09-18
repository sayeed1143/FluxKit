import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.email, formData.password, formData.name);
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
    
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-brand-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="bg-brand-card rounded-2xl shadow-xl p-8 border border-brand-border/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-accent-foreground font-bold text-2xl">A+</span>
            </div>
            <h2 className="text-3xl font-bold text-brand-foreground">
              {isLogin ? 'Welcome back' : 'Join A-Plus Tools'}
            </h2>
            <p className="mt-2 text-brand-muted">
              {isLogin 
                ? 'Sign in to access your dashboard' 
                : 'Create your account to get started'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-brand-muted mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-brand-muted" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required={!isLogin}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-brand-background border border-brand-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-brand-foreground"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-brand-muted mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-brand-muted" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-brand-background border border-brand-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-brand-foreground"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-muted mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-brand-muted" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-brand-background border border-brand-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-brand-foreground"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-brand-muted" />
                  ) : (
                    <Eye className="h-5 w-5 text-brand-muted" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-accent-foreground py-3 rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading 
                ? 'Processing...' 
                : isLogin 
                ? 'Sign In' 
                : 'Create Account'
              }
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-brand-muted">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-accent hover:text-accent/80 font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Demo Notice */}
          <div className="mt-6 p-4 bg-brand-background rounded-lg border border-brand-border/50">
            <p className="text-brand-muted text-sm text-center">
              <strong>Demo Mode:</strong> Use any email and password to sign in
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
