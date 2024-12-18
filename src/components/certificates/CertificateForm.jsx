import { useEffect } from 'react';
import { CertificateFormFields } from './CertificateFormFields';
import { SubmitButton } from '../form/SubmitButton';
import { useFormData } from '../../hooks/useFormData';

const initialFormState = {
  fullName: '',
  serialNumber: '',
  module: '',
  level: '',
  date: ''
};

export const CertificateForm = ({ onSubmit, initialData = null }) => {
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
      <SubmitButton isEdit={!!initialData} />
    </form>
  );
};