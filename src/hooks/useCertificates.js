import { useState, useCallback } from 'react';
import { useCertificateService } from './useCertificateService';
import { useAuth } from './useAuth';

export const useCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { certificateService } = useCertificateService();
  const { user } = useAuth();

  const loadCertificates = useCallback(async () => {
    if (!certificateService || !user) {
      setCertificates([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await certificateService.getCertificates();
      setCertificates(data);
    } catch (err) {
      console.error('Error loading certificates:', err);
      setError(err.message);
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  }, [certificateService, user]);

  const handleSubmit = async (formData, id = null) => {
    if (!certificateService || !user) {
      setError('Please sign in to perform this action');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (id) {
        await certificateService.updateCertificate(id, formData);
      } else {
        await certificateService.createCertificate(formData);
      }

      await loadCertificates();
    } catch (err) {
      console.error('Error saving certificate:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!certificateService || !user) {
      setError('Please sign in to perform this action');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await certificateService.deleteCertificate(id);
      await loadCertificates();
    } catch (err) {
      console.error('Error deleting certificate:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleBulkImport = async (certificates) => {
    if (!certificateService || !user) {
      setError('Please sign in to perform this action');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      for (const certificate of certificates) {
        await certificateService.createCertificate(certificate);
      }
      
      await loadCertificates();
    } catch (err) {
      console.error('Error importing certificates:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    certificates,
    loading,
    error,
    loadCertificates,
    handleSubmit,
    handleDelete,
    handleBulkImport
  };
};