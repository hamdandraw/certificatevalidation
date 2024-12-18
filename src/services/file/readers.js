import { readExcelFile } from './readers/excelReader';
import { readCSVFile } from './readers/csvReader';

export const readFile = async (file) => {
  const extension = file.name.split('.').pop()?.toLowerCase();
  
  if (extension === 'csv') {
    return readCSVFile(file);
  } else if (['xlsx', 'xls'].includes(extension)) {
    return readExcelFile(file);
  } else {
    throw new Error('Unsupported file format. Please use CSV, XLSX, or XLS files.');
  }
};