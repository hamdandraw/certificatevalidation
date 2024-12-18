import { CERTIFICATE_LEVELS } from '../../constants/levels';

const validLevels = CERTIFICATE_LEVELS
  .filter(level => level.value)
  .map(level => level.value);

export const validateImportedData = (certificates) => {
  const errors = [];

  certificates.forEach((cert, index) => {
    const rowNum = index + 1;
    validateCertificateRow(cert, rowNum, errors);
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

const validateCertificateRow = (cert, rowNum, errors) => {
  validateRequiredFields(cert, rowNum, errors);
  validateSerialNumber(cert.serialNumber, rowNum, errors);
  validateLevel(cert.level, rowNum, errors);
  validateDate(cert.date, rowNum, errors);
  validateStringLengths(cert, rowNum, errors);
};

const validateRequiredFields = (cert, rowNum, errors) => {
  const requiredFields = ['fullName', 'serialNumber', 'module', 'level', 'date'];
  
  requiredFields.forEach(field => {
    if (!cert[field]) {
      errors.push(`Row ${rowNum}: Missing ${field}`);
    }
  });
};

const validateSerialNumber = (serialNumber, rowNum, errors) => {
  if (serialNumber && !/^[A-Z0-9-]+$/i.test(serialNumber)) {
    errors.push(`Row ${rowNum}: Invalid serial number format (use only letters, numbers, and hyphens)`);
  }
};

const validateLevel = (level, rowNum, errors) => {
  if (level && !validLevels.includes(level)) {
    errors.push(`Row ${rowNum}: Invalid level (must be one of: ${validLevels.join(', ')})`);
  }
};

const validateDate = (date, rowNum, errors) => {
  if (date) {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      errors.push(`Row ${rowNum}: Invalid date format (use YYYY-MM-DD)`);
    }
  }
};

const validateStringLengths = (cert, rowNum, errors) => {
  const maxLengths = {
    fullName: 100,
    serialNumber: 50,
    module: 100
  };

  Object.entries(maxLengths).forEach(([field, maxLength]) => {
    if (cert[field] && cert[field].length > maxLength) {
      errors.push(`Row ${rowNum}: ${field} is too long (max ${maxLength} characters)`);
    }
  });
};