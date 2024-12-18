import { useState, useEffect } from 'react';
import { CertificateForm } from '../components/CertificateForm';
import { CertificateList } from '../components/CertificateList';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { PageLayout } from '../components/layout/PageLayout';
import { Header } from '../components/layout/Header';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorMessage } from '../components/shared/ErrorMessage';
import { EmailVerificationBanner } from '../components/auth/EmailVerificationBanner';
import { useCertificates } from '../hooks/useCertificates';
import { useAuth } from '../hooks/useAuth';

export const CertificatesPage = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { certificates, loading, error, loadCertificates, handleSubmit, handleDelete } = useCertificates();
  const { user } = useAuth();

  useEffect(() => {
    loadCertificates();
  }, [loadCertificates]);

  const handleEdit = (certificate) => {
    setSelectedCertificate(certificate);
    setIsFormVisible(true);
  };

  const onSubmit = async (formData) => {
    await handleSubmit(formData, selectedCertificate?.id);
    setIsFormVisible(false);
    setSelectedCertificate(null);
  };

  return (
    <>
      <Header />
      {!user?.emailVerified && <EmailVerificationBanner />}
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-6">
            {/* Left Sidebar - Navigation (25%) */}
            <div className="w-1/4">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Certificate Management</h2>
                <nav className="space-y-4">
                  <button
                    onClick={() => {
                      setSelectedCertificate(null);
                      setIsFormVisible(true);
                    }}
                    className="w-full flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
                    disabled={!user?.emailVerified}
                  >
                    <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Certificate
                  </button>
                  
                  <div className="px-4 py-3 bg-gray-50 rounded-md">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Quick Actions</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• View all certificates</li>
                      <li>• Edit existing certificates</li>
                      <li>• Remove certificates</li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>

            {/* Main Content - Right Side (75%) */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {isFormVisible ? (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      {selectedCertificate ? 'Edit Certificate' : 'Add New Certificate'}
                    </h2>
                    <CertificateForm
                      onSubmit={onSubmit}
                      initialData={selectedCertificate}
                      onCancel={() => {
                        setIsFormVisible(false);
                        setSelectedCertificate(null);
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
                    <DashboardStats certificates={certificates} />
                    {error && <ErrorMessage message={error} />}
                    {loading ? (
                      <LoadingSpinner />
                    ) : (
                      <CertificateList
                        certificates={certificates}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        isVerified={user?.emailVerified}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};