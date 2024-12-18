import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyEmail } from '../services/auth/emailConfirmation';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorMessage } from '../components/shared/ErrorMessage';
import { useAuth } from '../hooks/useAuth';

export const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const actionCode = searchParams.get('oobCode');

  useEffect(() => {
    const verifyEmailAddress = async () => {
      if (!actionCode) {
        navigate('/');
        return;
      }

      try {
        await verifyEmail(actionCode);
        // Wait a bit for the verification to propagate
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } catch (error) {
        console.error('Verification error:', error);
      }
    };

    verifyEmailAddress();
  }, [actionCode, navigate]);

  if (!actionCode) {
    return <ErrorMessage message="Invalid verification link" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Email Verification
          </h2>
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">
            Verifying your email address...
          </p>
        </div>
      </div>
    </div>
  );
};