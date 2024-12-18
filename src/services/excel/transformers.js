import { format } from 'date-fns';

export const transformForImport = (jsonData) => {
  return jsonData.map(row => {
    // Clean and transform the data
    const fullName = (row['Full Name'] || '').trim();
    const serialNumber = (row['Serial Number'] || '').trim();
    const module = (row['Module'] || '').trim();
    const level = (row['Level'] || '').trim();
    
    // Handle different date formats
    let date = row['Date'] || '';
    if (date) {
      try {
        // Try to parse the date and format it consistently
        date = format(new Date(date), 'yyyy-MM-dd');
      } catch (error) {
        console.warn('Invalid date format:', date);
        date = '';
      }
    }

    return {
      fullName,
      serialNumber,
      module,
      level,
      date: date || new Date().toISOString().split('T')[0]
    };
  });
};

export const transformForExport = (certificates) => {
  return certificates.map(cert => ({
    'Full Name': cert.fullName || '',
    'Serial Number': cert.serialNumber || '',
    'Module': cert.module || '',
    'Level': cert.level || '',
    'Date': cert.date ? format(new Date(cert.date), 'yyyy-MM-dd') : ''
  }));
};