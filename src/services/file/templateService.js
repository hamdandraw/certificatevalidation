import * as XLSX from 'xlsx';
import { CERTIFICATE_LEVELS } from '../../constants/levels';

export const generateTemplateFile = (format = 'xlsx') => {
  try {
    // Sample data with empty values and notes
    const sampleData = [{
      'Full Name': 'John Doe',
      'Serial Number': 'CERT-2024-001',
      'Module': 'Web Development',
      'Level': 'Intermediate',
      'Date': '2024-02-20'
    }];
    
    // Create worksheet with sample data
    const ws = XLSX.utils.json_to_sheet(sampleData);
    
    // Add column widths for better visibility
    ws['!cols'] = [
      { wch: 30 }, // Full Name
      { wch: 20 }, // Serial Number
      { wch: 30 }, // Module
      { wch: 15 }, // Level
      { wch: 15 }  // Date
    ];

    // Add notes about valid values
    const validLevels = CERTIFICATE_LEVELS
      .filter(level => level.value)
      .map(level => level.value)
      .join(', ');

    const notes = [
      ['Notes:'],
      ['- Full Name: Required, maximum 100 characters'],
      ['- Serial Number: Required, only letters, numbers, and hyphens allowed, maximum 50 characters'],
      ['- Module: Required, maximum 100 characters'],
      [`- Level: Required, must be one of: ${validLevels}`],
      ['- Date: Required, format: YYYY-MM-DD'],
      [''],
      ['Delete the sample row before importing your data.']
    ];

    // Add notes to a new worksheet
    const notesWs = XLSX.utils.aoa_to_sheet(notes);
    
    // Create workbook and append worksheets
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Certificate Template');
    XLSX.utils.book_append_sheet(wb, notesWs, 'Instructions');

    // Generate file
    const buffer = XLSX.write(wb, { bookType: format, type: 'array' });
    const mimeType = format === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const blob = new Blob([buffer], { type: mimeType });
    
    // Download file
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `certificate_template.${format}`;
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Template generation error:', error);
    throw new Error('Failed to generate template file');
  }
};