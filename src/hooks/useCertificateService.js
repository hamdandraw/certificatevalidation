import { useCallback, useMemo } from 'react';
import { useAuth } from './useAuth';
import { CertificateService } from '../services/certificate/certificateService';

export const useCertificateService = () => {
  const { user } = useAuth();

  const certificateService = useMemo(() => {
    if (!user) return null;
    return new CertificateService(
      user.uid,
      user.emailVerified
    );
  }, [user]);

  const handleError = useCallback((error) => {
    console.error('Certificate Service Error:', error);
    throw error;
  }, []);

  return {
    certificateService,
    handleError
  };
};