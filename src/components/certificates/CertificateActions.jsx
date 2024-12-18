import { ActionButtons } from '../shared/ActionButtons';

export const CertificateActions = ({ onEdit, onDelete }) => (
  <td className="px-6 py-4 whitespace-nowrap">
    <ActionButtons
      onEdit={onEdit}
      onDelete={onDelete}
      editLabel="Edit Certificate"
      deleteLabel="Delete Certificate"
    />
  </td>
);