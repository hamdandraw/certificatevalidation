import * as XLSX from 'xlsx';

const EXCEL_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const CSV_MIME_TYPE = 'text/csv';

export const writeToFile = (data, format = 'xlsx', filename) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Certificates');

  const options = {
    bookType: format,
    type: 'array'
  };

  const buffer = XLSX.write(wb, options);
  const mimeType = format === 'csv' ? CSV_MIME_TYPE : EXCEL_MIME_TYPE;
  const blob = new Blob([buffer], { type: mimeType });
  
  downloadFile(blob, filename, format);
};

const downloadFile = (blob, filename, format) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.${format}`;
  link.click();
  window.URL.revokeObjectURL(url);
};