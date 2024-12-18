export const FormField = ({ children, label }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    {children}
  </div>
);