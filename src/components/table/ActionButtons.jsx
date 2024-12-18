export const ActionButtons = ({ onEdit, onDelete }) => (
  <div className="space-x-2">
    <button
      onClick={onEdit}
      className="text-indigo-600 hover:text-indigo-900"
    >
      Edit
    </button>
    <button
      onClick={onDelete}
      className="text-red-600 hover:text-red-900"
    >
      Delete
    </button>
  </div>
);