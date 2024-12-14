require('dotenv').config()

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 3000;
const mongoString = process.env.MONGODB_URI
const app = express();

const routes = require('./routes/routes');

app.use(cors({ origin: 'http://localhost:5173' }));


app.use(express.json());
app.use('/api', routes);


mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
})

app.listen(port, ()=>{
    console.log(`server started at ${port}`);
});
