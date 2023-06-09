const nedb = require('nedb-promise');
const menuDB = new nedb({ filename: 'menu.db', autoload: true });
const campaignDB = new nedb({ filename: 'campaigns.db', autoload: true });
const { createDB } = require('../createDB.js');

createDB('/menu/menu.json', menuDB);
// createDB('/menu/campaigns.json', campaignDB);

async function getMenu() {
    const menu = await menuDB.find({});
    return menu;
}

async function getCampaigns() {
    const campaigns = await campaignDB.find({});
    return campaigns;
}

async function findMenuItem(id) {
    return await menuDB.findOne({ id: id });
}

function addProduct(newProduct) {
    menuDB.insert(newProduct);
}

function modifyProduct(modifiedProduct) {
    menuDB.insert(modifiedProduct);
}

async function removeProduct(productID) {
    const product = await findMenuItem(productID);

    if (product) {
        const filterObj = { id: productID };
        await menuDB.remove(filterObj);
        return { 
            success: true, 
            message: 'Product removed.'
        };
    } else {
        return { 
            success: false, 
            message: 'Product not found.'
        };
    }
}

async function addCampaign(newCampaign) {
    campaignDB.insert(newCampaign);
}


module.exports = {
    getMenu,
    getCampaigns,
    findMenuItem,
    addProduct,
    modifyProduct,
    removeProduct,
    addCampaign
}