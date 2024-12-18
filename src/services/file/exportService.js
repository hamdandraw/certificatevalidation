import { transformForExport } from './transformers';
import { writeToFile } from './writers';

export const exportFile = (certificates, format = 'xlsx') => {
  try {
    if (!certificates?.length) {
      throw new Error('No certificates to export');
    }

    const data = transformForExport(certificates);
    const filename = `certificates_${new Date().toISOString().split('T')[0]}`;
    
    writeToFile(data, format, filename);
  } catch (error) {
    console.error('Export error:', error);
    throw new Error(`Failed to export certificates to ${format.toUpperCase()}`);
  }
};