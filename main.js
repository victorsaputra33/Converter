// ################################ GUIDE #################################################
// ########################################################################################
// 1. Initialize file name that you want using variable *fileName*
// 2. Initialize query using variable *sql
// 3. Use initialized variable into action fuction(ConvertToCsv or ConvertToXlsx)
// 4. While ConvertToCsv, user need modify JSON header name in order to suceed this action
// 5. All the converted file will be shown inside your folder.
// ########################################################################################

// Import from other file
const convert = require('./converter.js');

// Initialize 
var fileName = 'country';
var sql = 'SELECT * FROM countries';

// Action
convert.ConvertToCsv(fileName,sql);
convert.ConvertToXlsx(fileName,sql);