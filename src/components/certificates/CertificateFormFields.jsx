import { FormInput } from '../form/FormInput';
import { FormSelect } from '../form/FormSelect';
import { CERTIFICATE_LEVELS } from '../../constants/levels';

export const CertificateFormFields = ({ formData, handleChange }) => (
  <>
    <FormInput
      label="Full Name"
      name="fullName"
      value={formData.fullName}
      onChange={handleChange}
    />

    <FormInput
      label="Serial Number"
      name="serialNumber"
      value={formData.serialNumber}
      onChange={handleChange}
    />

    <FormInput
      label="Module"
      name="module"
      value={formData.module}
      onChange={handleChange}
    />

    <FormSelect
      label="Level"
      name="level"
      value={formData.level}
      onChange={handleChange}
      options={CERTIFICATE_LEVELS}
    />

    <FormInput
      label="Date"
      name="date"
      type="date"
      value={formData.date}
      onChange={handleChange}
    />
  </>
);