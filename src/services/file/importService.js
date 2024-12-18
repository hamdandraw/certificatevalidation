import { readExcelFile } from './readers/excelReader';
import { readCSVFile } from './readers/csvReader';
import { transformForImport } from './transformers';
import { validateImportedData } from './validation';

export const importFromFile = async (file) => {
  if (!file) {
    throw new Error('No file provided');
  }

  const fileType = getFileType(file);
  if (!fileType) {
    throw new Error('Invalid file format. Please upload an Excel (.xlsx, .xls) or CSV (.csv) file');
  }

  try {
    let data;
    if (fileType === 'csv') {
      data = await readCSVFile(file);
    } else {
      data = await readExcelFile(file);
    }

    const transformedData = transformForImport(data);
    const { isValid, errors } = validateImportedData(transformedData);

    if (!isValid) {
      throw new Error(`Invalid data in file: ${errors.join(', ')}`);
    }

    return transformedData;
  } catch (error) {
    console.error('Import error:', error);
    throw new Error(error.message || 'Failed to import file');
  }
};

const getFileType = (file) => {
  const extension = file.name.split('.').pop()?.toLowerCase();
  const validExtensions = {
    xlsx: 'excel',
    xls: 'excel',
    csv: 'csv'
  };
  return validExtensions[extension];
};