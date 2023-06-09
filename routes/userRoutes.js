const express = require('express');
const { findUsers, createUser, getUsers } = require('../users/users.js');
const { checkProperty } = require('../utils.js');
const router = express.Router();

// Get users
router.get('/api/user/users', async (req, res) => {
    try {
        const user = await getUsers();
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Server error.' })
    }
});

// Create account
router.post('/api/user/signup', checkProperty('username'), checkProperty('password'), async (req, res) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role || "customer",
        orders: []
    }
    let responseObj = {
        success: true,
        message: 'Signup ok.'
    }

    const users = await findUsers();

    users.forEach(user => {
        if (user.username === newUser.username) {
            responseObj.success = false;
            responseObj.message = 'User already exists.'
        } 
    });

    if (responseObj.success) {
        createUser(newUser);
    }

    return res.json(responseObj);
});

// Log in
router.post('/api/user/login', checkProperty('username'), checkProperty('password'), async (req, res) => {
    const currentUser = req.body;
    let responseObj = {
        success: true,
        message: 'Login ok.'
    }

    const [ user ] = await findUsers('username', currentUser.username);
    if (user) {
        if (currentUser.password !== user.password) {
            responseObj.success = false;
            responseObj.message = 'Wrong password.'
        }
    } else {
        responseObj.success = false;
        responseObj.message = 'Wrong username.'
    }

    return res.json(responseObj);
});

// Get order history 
router.get('/api/user/history', checkProperty('userID'), async (req, res) => {
    const userID = req.body.userID;
    const [ user ] = await findUsers('_id', userID);
    const responseObj = {
        message: 'Previous orders',
    }

    if (user) {
        responseObj.orders = user.orders;
        return res.json(responseObj);
    } else {
        responseObj.message = 'Invalid userID.'
        return res.status(400).json(responseObj);
    }

});

module.exports = router;