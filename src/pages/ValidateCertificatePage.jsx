import { useState } from 'react';
import { validateCertificate } from '../services/certificate/validationService';
import { CertificateDetails } from '../components/certificates/CertificateDetails';
import { FormInput } from '../components/form/FormInput';
import { Header } from '../components/layout/Header';
import { PageLayout } from '../components/layout/PageLayout';

export const ValidateCertificatePage = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setCertificate(null);

    try {
      const result = await validateCertificate(serialNumber);
      setCertificate(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <PageLayout>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Certificate Validation
            </h2>
            <p className="mt-2 text-gray-600">
              Enter the certificate serial number to verify its authenticity
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Serial Number"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder="Enter certificate serial number"
                required
              />

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors duration-200"
              >
                {loading ? 'Validating...' : 'Validate Certificate'}
              </button>
            </form>

            {certificate && <CertificateDetails certificate={certificate} />}
          </div>
        </div>
      </PageLayout>
    </>
  );
};