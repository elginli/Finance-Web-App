const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')
const mongoose = require('mongoose')
require('dotenv/config')

const app = express();

const bcrypt = require('bcrypt')

app.use(express.json())

app.use(express.urlencoded({extended:false}))

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page');
});

app.use('/', router)

const port = process.env.PORT || 4000;
const dbOptions = {useNewUrlParser:true, useUnifiedTopology:true}
mongoose.connect(process.env.DB_URI, dbOptions)
.then(() => console.log('DB Connected'))
.catch(err => console.log(err))

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
