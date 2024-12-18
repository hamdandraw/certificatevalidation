import { FormField } from './FormField';

export const FormSelect = ({ label, name, value, onChange, options }) => (
  <FormField label={label}>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      required
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </FormField>
);