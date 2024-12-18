import { useState } from 'react';
import { FileService } from '../../services/file/fileService';
import { ImportButton } from './ImportButton';
import { ExportButton } from './ExportButton';
import { TemplateButton } from './TemplateButton';

export const ImportExportButtons = ({ certificates, onImport }) => {
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState('');

  const handleImport = async (file) => {
    setImporting(true);
    setError('');
    
    try {
      const importedData = await FileService.import(file);
      await onImport(importedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setImporting(false);
    }
  };

  const handleExport = async (format) => {
    try {
      setError('');
      await FileService.export(certificates, format);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleTemplate = async (format) => {
    try {
      setError('');
      await FileService.generateTemplate(format);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <TemplateButton onClick={handleTemplate} />
        <ImportButton onImport={handleImport} disabled={importing} />
        <ExportButton 
          onClick={handleExport} 
          disabled={!certificates.length} 
        />
      </div>
      
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
          {error}
        </div>
      )}
    </div>
  );
};