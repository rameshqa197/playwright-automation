const XLSX = require('xlsx');

class ExcelUtil {

    constructor(filePath) {
        this.filePath = filePath;
        this.workbook = XLSX.readFile(this.filePath);
    }

    // Read Excel Data
    readExcelFile(sheetName) {
        const worksheet = this.workbook.Sheets[sheetName];
        return XLSX.utils.sheet_to_json(worksheet);
    }

    // Write Result Back To Excel
    writeResultToExcel(sheetName, rowIndex, status) {

        const worksheet = this.workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        // Update Status
        if (!data[rowIndex]) {
            throw new Error(`Row ${rowIndex} not found in Excel`);
        }

        data[rowIndex].Status = status;

        const newSheet = XLSX.utils.json_to_sheet(data);
        this.workbook.Sheets[sheetName] = newSheet;

        XLSX.writeFile(this.workbook, this.filePath);
    }
}

module.exports = {ExcelUtil};
