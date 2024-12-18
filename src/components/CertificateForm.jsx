import { useEffect } from 'react';
import { CertificateFormFields } from './certificates/CertificateFormFields';
import { SubmitButton } from './form/SubmitButton';
import { useFormData } from '../hooks/useFormData';

const initialFormState = {
  fullName: '',
  serialNumber: '',
  module: '',
  level: '',
  date: ''
};

export const CertificateForm = ({ onSubmit, initialData = null, onCancel }) => {
  const { formData, handleChange, setFormData } = useFormData(initialFormState);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData, setFormData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CertificateFormFields
        formData={formData}
        handleChange={handleChange}
      />
      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <SubmitButton isEdit={!!initialData} />
      </div>
    </form>
  );
};