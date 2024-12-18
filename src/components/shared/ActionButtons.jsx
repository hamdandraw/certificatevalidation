export const ActionButtons = ({ onEdit, onDelete, editLabel, deleteLabel }) => (
  <div className="space-x-2">
    <button
      onClick={onEdit}
      className="text-indigo-600 hover:text-indigo-900"
      aria-label={editLabel}
    >
      Edit
    </button>
    <button
      onClick={onDelete}
      className="text-red-600 hover:text-red-900"
      aria-label={deleteLabel}
    >
      Delete
    </button>
  </div>
);