import { useState } from 'react';
import { Modal } from '../shared/Modal';
import { UpdateEmailForm } from './UpdateEmailForm';
import { UpdatePasswordForm } from './UpdatePasswordForm';

export const UserProfileModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('email');

  const tabs = [
    { id: 'email', label: 'Update Email' },
    { id: 'password', label: 'Update Password' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Profile Settings">
      <div className="space-y-6">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === 'email' ? (
            <UpdateEmailForm onClose={onClose} />
          ) : (
            <UpdatePasswordForm onClose={onClose} />
          )}
        </div>
      </div>
    </Modal>
  );
};