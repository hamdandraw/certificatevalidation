import { useState } from 'react';
import { useAuth } from './useAuth';
import { sendVerificationEmail } from '../services/auth/emailConfirmation';

export const useEmailConfirmation = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendVerification = async () => {
    if (!user) {
      setError('User must be logged in to verify email');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await sendVerificationEmail(user);
      setSuccess(true);
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    sendVerification,
    isVerified: user?.emailVerified ?? false
  };
};