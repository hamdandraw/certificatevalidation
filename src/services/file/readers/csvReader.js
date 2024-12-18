export const readCSVFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const rows = text.split('\n');
        const headers = rows[0].split(',').map(header => header.trim());
        
        const jsonData = rows.slice(1)
          .filter(row => row.trim()) // Remove empty rows
          .map(row => {
            const values = row.split(',').map(value => value.trim());
            return headers.reduce((obj, header, index) => {
              obj[header] = values[index] || '';
              return obj;
            }, {});
          });

        if (!jsonData.length) {
          throw new Error('No data found in file');
        }

        resolve(jsonData);
      } catch (error) {
        reject(new Error('Failed to read CSV file. Please check the format.'));
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};