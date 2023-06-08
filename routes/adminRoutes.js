// // const router = express.Router();
// const { addProduct, updateProduct, removeProduct, addCampaign } = require('../admin/admin.js');

// // Lägg till produkt
// router.post('/api/admin/addproduct', (req, res) => {
//     // const newProduct = {
//     //     id:
//     //     title:
//     //     desc:
//     //     price: 
//     // }

// });

// ////////////////////
// // app.post('/api/addcat', (req, res) => {
// //     // förvänta oss data från användaren i form av ett objekt
// //     // req.body = {
// //     //     name: "Smilla",
// //     //     age: 3,
// //     //     img: "",
// //     //     neutered: false
// //     // }
// //     const cat = req.body;
// //     catsDB.insert(cat);
// //     res.send('all good');
// // });

// // router.post('/api/beans/order', checkProperty('userID'), checkProperty('order'), orderValidation, async (req, res) => {
// //     const userID = req.body.userID;
// //     const date = new Date().toLocaleString();
// //     const newOrder = {
// //         orderNumber: uuidv4(),
// //         timeOfOrder: date,
// //         delivery: plannedDelivery(),
// //         order: req.body.order,
// //         totalPrice: res.locals.totalPrice
// //     }

// //     const [ user ] = await findUsers('_id', userID);

// //     if (user) {
// //         if (req.body.order.length > 0) {
// //             updateUserOrders(userID, newOrder);
// //             return res.json(newOrder);
// //         } else {
// //             return res.status(400).json({ message: 'Cannot place an empty order.'});
// //         }
// //     } else {
// //         return res.status(404).json({ message: 'User not found.'});
// //     }

// // });

// // router.post('/api/user/signup', checkProperty('username'), checkProperty('password'), async (req, res) => {
// //     const newUser = {
// //         username: req.body.username,
// //         password: req.body.password,
// //         orders: []
// //     }
// //     let responseObj = {
// //         success: true,
// //         message: 'Signup ok.'
// //     }

// //     const users = await findUsers();

// //     users.forEach(user => {
// //         if (user.username === newUser.username) {
// //             responseObj.success = false;
// //             responseObj.message = 'User already exists.'
// //         }
// //     });

// //     if (responseObj.success) {
// //         createUser(newUser);
// //     }

// //     return res.json(responseObj);
// // });
// ////////////////////


// // Ändra produkt
// router.post('/api/admin/updateproduct', (req, res) => {

// });

// ////////////////////
// // app.put('/api/updatecat', (req, res) => {
// //     // const req,body = {
// //     //     id: id,
// //     //     whatToUpdate: name,
// //     //     updateto: 'Arnold'
// //     // }
// //     const { id, whatToUpdate, updateTo } = req.body;
// //     if (whatToUpdate == 'name') {
// //         catsDB.update({ _id: id }, { $set: { name: updateTo } });
// //     } else if (whatToUpdate == 'age') {
// //         catsDB.update({ _id: id }, { $set: { age: updateTo } });
// //     } else if (whatToUpdate == 'img') {
// //         catsDB.update({ _id: id }, { $set: { img: updateTo } });
// //     }
// //     res.send('all good')
// // });
// ////////////////////

// // Radera produkt
// router.delete('/api/admin/removeproduct', (req, res) => {

// });


// ////////////////////
// // app.delete('/api/deletecat', (req, res) => {
// //     // vi förväntar oss ett id från användaren
// //     const catId = req.body.id;
// //     catsDB.remove({ _id: catId }, function (err, removed) {
// //         if (err) {
// //             console.log(err, 'lite fel blev det här');
// //         } else {
// //             console.log(removed);
// //         }
// //     });
// //     res.send('cat gone')
// // });
// ////////////////////


// // Lägg till kampanj
// router.add('/api/admin/addcampaign', (req, res) => {

// });

// module.exports = router;