export const validateCertificateData = (data) => {
  const errors = {};

  if (!data.fullName?.trim()) {
    errors.fullName = 'Full name is required';
  }

  if (!data.serialNumber?.trim()) {
    errors.serialNumber = 'Serial number is required';
  } else if (!/^[A-Z0-9-]+$/i.test(data.serialNumber)) {
    errors.serialNumber = 'Serial number can only contain letters, numbers, and hyphens';
  }

  if (!data.module?.trim()) {
    errors.module = 'Module is required';
  }

  if (!data.level) {
    errors.level = 'Level is required';
  }

  if (!data.date) {
    errors.date = 'Date is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};