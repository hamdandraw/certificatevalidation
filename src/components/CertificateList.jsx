import { format } from 'date-fns';
import { CertificateRow } from './table/CertificateRow';
import { TableHeader } from './table/TableHeader';
import { Pagination } from './pagination/Pagination';
import { usePagination } from '../hooks/usePagination';

export const CertificateList = ({ certificates, onEdit, onDelete }) => {
  const {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange
  } = usePagination(certificates);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader />
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedItems.map((certificate) => (
              <CertificateRow
                key={certificate.id}
                certificate={certificate}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};