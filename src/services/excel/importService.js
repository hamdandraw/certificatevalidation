import { utils } from 'xlsx';
import { transformForImport } from './transformers';
import { validateImportedData } from './validation';

export const importFromExcel = async (file) => {
  if (!file) {
    throw new Error('No file provided');
  }

  if (!file.name.match(/\.(xlsx|xls)$/)) {
    throw new Error('Invalid file format. Please upload an Excel file (.xlsx or .xls)');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = utils.read(data, { type: 'array' });
        
        if (!workbook.SheetNames.length) {
          throw new Error('Excel file is empty');
        }

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json(worksheet);

        if (!jsonData.length) {
          throw new Error('No data found in Excel file');
        }

        // Transform and validate the data
        const certificates = transformForImport(jsonData);
        const validationResult = validateImportedData(certificates);

        if (!validationResult.isValid) {
          throw new Error(`Invalid data in Excel file: ${validationResult.errors.join(', ')}`);
        }

        resolve(certificates);
      } catch (error) {
        console.error('Import parsing error:', error);
        reject(new Error(error.message || 'Failed to parse Excel file. Please check the file format.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read Excel file'));
    };

    reader.readAsArrayBuffer(file);
  });
};