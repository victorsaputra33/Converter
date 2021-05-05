// Require Import
const xl = require('excel4node');
const wb = new xl.Workbook();
const mysql = require('mysql');
const fs = require('fs');

// Create a connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hr"
});

// Check connection to database
connection.connect(error => {
    if (error) {
        console.log('error connecting: ' + error.stack);
        return;
    }
});

// Function to convert data from database data to csv file
function ConvertToCsv (fileName, sql) {

    // Create csv file using stream
    const stream = fs.createWriteStream(fileName+".csv");
    // Connect to database using query
    connection.query(sql , function(error, data, fields) {
        // Get database data into local JSON variable
        const jsonData = JSON.parse(JSON.stringify(data),'utf-8');
        // Loop every data from JSON variable 
        for (var i = 0; i < Object.keys(jsonData).length; i++) {
            // Initialize variable contain local JSON variable seperate by ';' 
            // [json data header name must be initialize. Below: country_id, country_name, region_id]
            var string = jsonData[i].country_id + ";" + jsonData[i].country_name + ";" + jsonData[i].region_id + "\n";
            // Write data into csv
            stream.write(string);
        }
    });
   
}

// Function to convert data from database data to xlsx file
function ConvertToXlsx (fileName, sql) {

    // Create xlsx file
    const ws = wb.addWorksheet(fileName);
    // Connect to database using query
    connection.query(sql , function(error, data, fields) {
        // Get database data into local JSON variable
        const jsonData = JSON.parse(JSON.stringify(data),'utf-8');
        // Initialize index row in Excel
        let rowIndex = 1;
        // Loop every data from JSON variable  
        jsonData.forEach( record => {
            // Initialize index column in Excel
            let columnIndex = 1;
            // Loop every row's data to write every column 
            Object.keys(record).forEach(columnName =>{
                // Check column data if this data is a string type
                if (typeof record [columnName] == 'string') {
                    // Write column data to xlsx based on row index and column index
                    ws.cell(rowIndex,columnIndex++).string(record [columnName])
                // Check column data if this data is a number type
                } else if (typeof record [columnName] == 'number') {
                    // Write column data to xlsx based on row index and column index
                    ws.cell(rowIndex,columnIndex++).number(record [columnName])
                }
            });
            // Next row index
            rowIndex++;
        }); 
        // Create xlsx file
        wb.write(fileName+'.xlsx', function(err, stats) {
            // Converted file condition after write
            if (err) { 
                console.error(err); 
            } else { 
                console.log('Convert data to xlsx file success!!!'); 
            }
        });
    });
}

// Export module
module.exports = {
    ConvertToCsv,
    ConvertToXlsx
};
