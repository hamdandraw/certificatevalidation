import { useState } from 'react';
import { ImportButton } from './ImportButton';
import { ExportButton } from './ExportButton';
import { TemplateDownloadButton } from './TemplateDownloadButton';
import { importFromExcel } from '../../services/excel/importService';
import { exportToExcel } from '../../services/excel/exportService';
import { generateTemplateFile } from '../../services/excel/templateService';

export const ImportExportButtons = ({ certificates, onImport }) => {
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState('');

  const handleImport = async (file) => {
    setImporting(true);
    setError('');
    
    try {
      const importedCertificates = await importFromExcel(file);
      await onImport(importedCertificates);
    } catch (error) {
      console.error('Import error:', error);
      setError(error.message);
    } finally {
      setImporting(false);
    }
  };

  const handleExport = () => {
    if (certificates.length === 0) {
      setError('No certificates to export');
      return;
    }
    
    try {
      setError('');
      exportToExcel(certificates);
    } catch (error) {
      console.error('Export error:', error);
      setError(error.message);
    }
  };

  const handleTemplateDownload = () => {
    try {
      setError('');
      generateTemplateFile();
    } catch (error) {
      console.error('Template download error:', error);
      setError('Failed to download template');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <TemplateDownloadButton onClick={handleTemplateDownload} />
        <ImportButton onImport={handleImport} disabled={importing} />
        <ExportButton onClick={handleExport} disabled={certificates.length === 0} />
      </div>
      
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
          {error}
        </div>
      )}
    </div>
  );
};