import { utils, write } from 'xlsx';
import { transformForExport } from './transformers';

export const exportToExcel = (certificates) => {
  try {
    const data = transformForExport(certificates);
    
    // Create worksheet
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Certificates');

    // Generate Excel file
    const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
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
    throw new Error('Failed to export certificates to Excel');
  }
};