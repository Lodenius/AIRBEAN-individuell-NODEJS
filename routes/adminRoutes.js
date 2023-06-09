const express = require('express');
const router = express.Router();
const { getMenu, addCampaign, getCampaigns, removeProduct, menuDB } = require('../menu/menu.js');
const { checkProperty, productValidation, isAdmin } = require('../utils.js');
const { addProduct } = require('../menu/menu');
const { modifyProduct } = require('../menu/menu.js');

// Add product
router.post('/api/admin/add', checkProperty('userID'), checkProperty('newItem'), checkProperty('newItem.id'), checkProperty('newItem.title'), checkProperty('newItem.desc'), checkProperty('newItem.price'), isAdmin, async (req, res) => {
    const date = new Date().toLocaleString();
    const newProduct = {
        ...req.body.newItem,
        createdAt: date
    }
    
    let responseObj = {
        success: true,
        message: 'Product added.'
    }

    const products = await getMenu();

    for (const product of products) {    
        if (product.title === newProduct.title) {
            responseObj.success = false;
            responseObj.message = 'Product name already exists.';
            break;
        } else if (product.id === newProduct.id) {
            responseObj.success = false;
            responseObj.message = 'Product id already exists.';
            break;
        }
    }

    if (responseObj.success) {
        addProduct(newProduct);
    }
    return res.json(responseObj);
});

// Modify product
router.post('/api/admin/modify', checkProperty('userID'), checkProperty('product'), checkProperty('product.id'), checkProperty('product.whatToModify'), checkProperty('product.changeTo'), isAdmin, async (req, res) => {
    const date = new Date().toLocaleString();
    const modifiedProduct = {
        ...req.body.product,
    }
    
    let responseObj = {
        success: true,
        message: 'Product modified.'
    }

    const products = await getMenu();
    let productFound = false;

    for (const product of products) {    
        if (product.id === modifiedProduct.id) {
            productFound = true;
        
            if (!modifiedProduct.whatToModify || !modifiedProduct.changeTo) {
                responseObj.success = false;
                responseObj.message = 'Invalid modification request.';
            } else {
                try {
                    if (modifiedProduct.whatToModify == 'title') {
                        menuDB.update({ id: product.id }, { $set: { title: modifiedProduct.changeTo, modifiedAt: date}});               
                    } else if (modifiedProduct.whatToModify == 'desc') {
                        menuDB.update({ id: product.id }, { $set: { desc: modifiedProduct.changeTo, modifiedAt: date}});               
                    } else if (modifiedProduct.whatToModify == 'price') {
                        menuDB.update({ id: product.id }, { $set: { price: modifiedProduct.changeTo, modifiedAt: date}});
                    } else if (modifiedProduct.whatToModify == 'id') {
                        responseObj.success = false;
                        responseObj.message = 'Cannot change id';
                    }
                } catch (error) {
                    console.error('Error during menuDB.update():', error);
                }
            } break;
        }
    }
    if (!productFound) {
        responseObj.success = false;
        responseObj.message = 'Product does not exist.';
    }

    if (responseObj.success) {
        modifyProduct(modifiedProduct);
    }

    return res.json(responseObj);

});


// Remove product
router.delete('/api/admin/remove', checkProperty('userID'), checkProperty('product'), isAdmin, async (req, res) => {
    const productID = req.body.product[0].id;
    const result = await removeProduct(productID);

    if (result.success) {
        res.json(result)
    } else {
        res.status(400).json(result)
    }
})

// Add campaign
router.post('/api/admin/newcampaign', checkProperty('userID'), checkProperty('products'), checkProperty('newPrice'), productValidation, isAdmin, async (req, res) => {
    const date = new Date().toLocaleString();
    const newCampaign = {
        products: req.body.products,
        newPrice: req.body.newPrice,
        originalPrice: res.locals.originalPrice,
        createdAt: date
    }
    
    let responseObj = {
        success: true,
        message: 'Campaign created.'
    }

        if (req.body.products.length > 0) {
            addCampaign(newCampaign);
            return res.json(responseObj);
        } else {
            return res.status(400).json({ message: 'Campaign must consist of at least one product.' });
        }

});

// Get campaigns
router.get('/api/admin/campaigns', async (req, res) => {
    try {
        const camapigns = await getCampaigns();
        return res.json(camapigns);
    } catch (error) {
        return res.status(500).json({ message: 'Server error.' })
    }
});

module.exports = router;