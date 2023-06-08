const nedb = require('nedb-promise');
const adminDB = new nedb({ filename: 'admin.db', autoload: true });
const { createDB } = require('../createDB.js');

createDB('/admin/admin.json', adminDB);


// async function addProduct() {

// }

// async function updateProduct() {
    
// }

// async function removeProduct() {
    
// }



// async function addCampaign() {
    
// }

// module.exports = {
//     addProduct,
//     updateProduct,
//     removeProduct,
//     addCampaign
// }