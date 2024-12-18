import { importFromFile } from './importService';
import { exportToFile } from './exportService';
import { generateTemplate } from './templateService';

export const FileService = {
  import: importFromFile,
  export: exportToFile,
  generateTemplate
};