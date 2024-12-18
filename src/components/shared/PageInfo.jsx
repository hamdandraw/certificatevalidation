export const PageInfo = ({ currentPage, totalPages, totalItems }) => (
  <div className="text-sm text-gray-500 mt-4">
    <p>
      Showing page {currentPage} of {totalPages} ({totalItems} total items)
    </p>
  </div>
);