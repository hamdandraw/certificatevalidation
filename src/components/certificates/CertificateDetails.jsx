import { formatDate } from '../../utils/dateUtils';

export const CertificateDetails = ({ certificate }) => (
  <div className="mt-8 border-t pt-6">
    <h2 className="text-lg font-medium text-gray-900 mb-4">Certificate Details</h2>
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      <DetailRow label="Full Name" value={certificate.fullName} />
      <DetailRow label="Serial Number" value={certificate.serialNumber} />
      <DetailRow label="Module" value={certificate.module} />
      <DetailRow label="Level" value={certificate.level} />
      <DetailRow label="Issue Date" value={formatDate(certificate.date)} />
      <div className="flex items-center pt-2">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="ml-2 text-sm text-green-600">This certificate is valid and verified</p>
      </div>
    </div>
  </div>
);

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="text-sm text-gray-900">{value}</dd>
  </div>
);