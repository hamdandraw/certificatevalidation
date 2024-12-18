import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { updateUserEmail } from '../../services/auth/profileService';
import { FormInput } from '../form/FormInput';

export const UpdateEmailForm = ({ onClose }) => {
  const { user } = useAuth();
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await updateUserEmail(user, newEmail, password);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        label="Current Email"
        value={user?.email || ''}
        disabled
        type="email"
      />

      <FormInput
        label="New Email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        type="email"
        required
      />

      <FormInput
        label="Current Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        required
      />

      {error && (
        <div className="text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Email'}
        </button>
      </div>
    </form>
  );
};