export const validateImportedData = (certificates) => {
  const errors = [];
  const requiredFields = ['fullName', 'serialNumber', 'module', 'level', 'date'];
  const validLevels = ['Beginner', 'Intermediate', 'Advanced'];

  certificates.forEach((cert, index) => {
    const rowNum = index + 1;

    // Check required fields
    requiredFields.forEach(field => {
      if (!cert[field]) {
        errors.push(`Row ${rowNum}: Missing ${field}`);
      }
    });

    // Validate serial number format
    if (cert.serialNumber && !/^[A-Z0-9-]+$/i.test(cert.serialNumber)) {
      errors.push(`Row ${rowNum}: Invalid serial number format (use only letters, numbers, and hyphens)`);
    }

    // Validate level
    if (cert.level && !validLevels.includes(cert.level)) {
      errors.push(`Row ${rowNum}: Invalid level (must be one of: ${validLevels.join(', ')})`);
    }

    // Validate date format
    if (cert.date) {
      const dateObj = new Date(cert.date);
      if (isNaN(dateObj.getTime())) {
        errors.push(`Row ${rowNum}: Invalid date format (use YYYY-MM-DD)`);
      }
    }

    // Validate string lengths
    if (cert.fullName && cert.fullName.length > 100) {
      errors.push(`Row ${rowNum}: Full name is too long (max 100 characters)`);
    }
    if (cert.serialNumber && cert.serialNumber.length > 50) {
      errors.push(`Row ${rowNum}: Serial number is too long (max 50 characters)`);
    }
    if (cert.module && cert.module.length > 100) {
      errors.push(`Row ${rowNum}: Module name is too long (max 100 characters)`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};