import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultTab = 'signin' }) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(defaultTab);

  const handleSuccess = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            activeTab === 'signin'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('signin')}
        >
          Sign In
        </button>
        <button
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            activeTab === 'signup'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('signup')}
        >
          Sign Up
        </button>
      </div>

      {activeTab === 'signin' ? (
        <SignInForm onSuccess={handleSuccess} />
      ) : (
        <SignUpForm onSuccess={handleSuccess} />
      )}
    </Modal>
  );
};
