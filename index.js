const express = require('express');

const beansRoutes = require('./routes/beansRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js')

const app = express();
const PORT = 5555;

app.use(express.json());
app.use(beansRoutes);
app.use(userRoutes);
app.use(adminRoutes)


app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});
