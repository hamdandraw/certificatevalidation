import * as XLSX from 'xlsx';
import { transformForImport, transformForExport } from './transformers';
import { validateImportedData } from './validation';

export const importFromExcel = async (file) => {
  if (!file) {
    throw new Error('No file provided');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        if (!workbook.SheetNames.length) {
          throw new Error('Excel file is empty');
        }

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

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
        reject(new Error(error.message || 'Failed to parse Excel file'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read Excel file'));
    };

    reader.readAsArrayBuffer(file);
  });
};

export const exportToExcel = (certificates) => {
  try {
    const data = transformForExport(certificates);
    
    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Certificates');

    // Generate Excel file
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    
    // Download file
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `certificates_${new Date().toISOString().split('T')[0]}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Export error:', error);
    throw new Error('Failed to export certificates');
  }
};