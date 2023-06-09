const nedb = require('nedb-promise');
const usersDB = new nedb({ filename: 'users.db', autoload: true });
const { createDB } = require('../createDB.js');

// createDB('/users/users.json', usersDB);

async function getUsers() {
    const users = await usersDB.find({});
    return users;
}

function updateUserOrders(userID, newOrder) {
    usersDB.update({ _id: userID }, { $push: { orders: newOrder } });
}

function createUser(newUser) {
    usersDB.insert(newUser);
}

async function findUsers(property, value) {
    const query = {};
    if (property && value) {
        query[property] = value;
    }
    const users = await usersDB.find(query);
    return users;
}

module.exports = {
    getUsers,
    updateUserOrders,
    createUser,
    findUsers
}