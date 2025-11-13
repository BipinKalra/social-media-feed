import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SignInForm } from '../components/auth/SignInForm';

export const SignIn: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">foo-rum</h1>
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome back</h2>
          <SignInForm />
        </div>

        <p className="text-center mt-6 text-sm text-gray-600">
          New to foo-rum?{' '}
          <Link to="/signup" className="text-primary hover:text-primary-hover font-medium">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
