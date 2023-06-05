const nedb = require('nedb-promise');
const menuDB = new nedb({ filename: 'menu.db', autoload: true });
const { createDB } = require('../createDB.js');

async function addProduct() {

}

async function updateProduct() {
    
}

async function removeProduct() {
    
}



async function addCampaign() {
    
}

module.exports = {
    addProduct,
    updateProduct,
    removeProduct,
    addCampaign
}