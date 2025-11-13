import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { validateEmail, validatePassword, validateName, calculatePasswordStrength } from '../../utils/validation';

interface SignUpFormProps {
  onSuccess?: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});
  const [apiError, setApiError] = useState('');

  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const passwordStrength = calculatePasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError('');

    // Validation
    const newErrors: typeof errors = {};

    if (!validateName(name)) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await signup(name, email, password);
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/');
      }
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Signup failed');
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength === 'weak') return 'bg-red-500';
    if (passwordStrength === 'medium') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthWidth = () => {
    if (passwordStrength === 'weak') return 'w-1/3';
    if (passwordStrength === 'medium') return 'w-2/3';
    return 'w-full';
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
      onSubmit={handleSubmit}
    >
      <Input
        label="Full Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
        placeholder="Enter your full name"
        required
      />

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        placeholder="Enter your email"
        required
      />

      <div>
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          placeholder="Create a password"
          required
        />
        {password && (
          <div className="mt-2">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Password strength:</span>
              <span className="capitalize font-medium">{passwordStrength}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()} ${getStrengthWidth()}`} />
            </div>
          </div>
        )}
      </div>

      <Input
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
        placeholder="Confirm your password"
        required
      />

      <div>
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mt-0.5"
          />
          <span className="ml-2 text-sm text-gray-700">
            I accept the{' '}
            <button
              type="button"
              onClick={() => alert('Terms and conditions not implemented in demo')}
              className="text-primary hover:text-primary-hover"
            >
              terms and conditions
            </button>
          </span>
        </label>
        {errors.terms && (
          <p className="mt-1 text-sm text-red-500">{errors.terms}</p>
        )}
      </div>

      {apiError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
        >
          {apiError}
        </motion.div>
      )}

      <Button type="submit" className="w-full" loading={loading}>
        Sign Up
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">OR</span>
        </div>
      </div>

      <Button
        type="button"
        variant="secondary"
        className="w-full items-center flex justify-center gap-4"
        onClick={() => alert('Google sign-up not implemented in demo')}
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      </Button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => navigate('/signin')}
          className="text-primary hover:text-primary-hover font-medium"
        >
          Sign in
        </button>
      </p>
    </motion.form>
  );
};
