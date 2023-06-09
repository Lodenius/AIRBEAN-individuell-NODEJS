const { findMenuItem } = require('./menu/menu.js');
const { findUsers } = require('./users/users.js');

// Create function so check nested properties
function nestedProperty(obj, propertyPath) {
    const properties = propertyPath.split('.');
    let currentObj = obj;

    for (const property of properties) {
        if (currentObj.hasOwnProperty(property)) {
            currentObj = currentObj[property];
        } else {
            return false;
        }
    }

    return true;
}

// Check property
function checkProperty(property) {
    return function(req, res, next) {
        if (nestedProperty(req.body, property)) {
            next();
        } else {
            return res.status(400).json({ success: false, error: `Must have ${property} data.` });
        }
    }
}

// Validate order - check if item exists + sum price
async function orderValidation(req, res, next) {
    let orderItems = req.body.order;
    let totalPrice = 0;

    orderItems = await Promise.all(orderItems.map(async item => {
        return await findMenuItem(item.id);
    }));        

    for (const item of orderItems) {
        if (item && item.price) {
            totalPrice = totalPrice + item.price;
        } else {
            return res.status(400).json({ success: false, error: 'One or more order item does not exist.' });
        }
    }

    res.locals.totalPrice = totalPrice;
    next();
}

// Admin - Check if item exists
async function productValidation(req, res, next) {
    let menuItems = req.body.products;
    let originalPrice = 0;

    menuItems = await Promise.all(menuItems.map(async item => {
        return await findMenuItem(item.id);
    }));        

    for (const item of menuItems) {
        if (!item) {
            return res.status(400).json({ success: false, error: 'One or more order item does not exist.' });
        } else {
            originalPrice = originalPrice + item.price;
        }
    }

    res.locals.originalPrice = originalPrice;
    next();
}

// Admin - Validate new product
function addNewProduct(property) {
    let newItem = req.body.product;
    return function(req, res, next) {
        if (req.body.hasOwnProperty(property)) {
            next();
        } else {
            return res.status(400).json({ success: false, error: `Must have ${property} data.` });
        }
    }
}

// Admin - Verify if admin
async function isAdmin(req, res, next) {
    const userID = req.body.userID;
    const [user] = await findUsers('_id', userID);

    if (user && user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ success: false, message: 'Must be admin to do this.' });
    }
}


// Check remaining time of order before delivery
function checkDelivery(order) {
    const timestamp = order.delivery;

    const milliseconds = Date.parse(timestamp) - Date.now();
    const minutes = Math.floor(milliseconds / 60000);

    return minutes;
}

// Check diff between deliverytime and now
function isDelivered(order) {
    const diff = Date.parse(order.delivery) - Date.now();
    if (diff > 0) {
        return false;
    } else {
        return true;
    }
}

// Creates deliverytime
function plannedDelivery() {
    const delivery = new Date(Date.now() + (20 * 60 * 1000)).toLocaleString();
    return delivery;
}

module.exports = {
    checkProperty,
    orderValidation,
    productValidation,
    addNewProduct,
    checkDelivery,
    plannedDelivery,
    isDelivered,
    isAdmin
}