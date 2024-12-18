import { FormField } from './FormField';

export const FormInput = ({ label, name, type = 'text', value, onChange }) => (
  <FormField label={label}>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      required
    />
  </FormField>
);