const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')
const bcrypt = require('bcrypt');

router.post('/home', async(req,res) => {
    const {budget, month, year, food, home, school, transportation, fun, misc} = req.body

    const newUserData = new schemas.UserData({budget: budget, month: month, year: year, food: food, home: home, school: school, transportation: transportation, fun: fun, misc: misc})
    const saveUserData = await newUserData.save()

    if (saveUserData) {
        console.log(`Budget: ${budget}, Month: ${month}, Year: ${year}, Food: ${food}, Home: ${home}, School: ${school}, Transportation: ${transportation}, Fun: ${fun}, Misc: ${misc}`)
        res.send('Data recieved')
    } else {
        res.send('Error')
    }

    res.end()
})

const user = {
    "name": "Elgin",
    "email": "elginli1025@gmail.com",
    "password": "123" // Passwords should be hashed in a real application
};

router.post('/login', (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    if (email === user.email && password === user.password) {
        res.send({ status: "exist", user: { name: user.name, email: user.email } });
    } else {
        res.send({ status: "notexist" });
    }
});

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await schemas.Users.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send('Email already in use');
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance and save it to the database
        const newUser = new schemas.Users({
            name: name,
            email: email,
            password: hashedPassword
        });

        const saveUser = await newUser.save();
        res.status(201).send({ message: 'User created successfully', userId: saveUser._id });
    } catch (e) {
        res.status(500).send('Server error');
        console.error(error);
    }
});

/*
router.get('/user', (req, res) => {
    const userData = [{ 
        "name": "Elgin", 
        "email": "elginli1025@gmail.com",
        "password": "123"
    }]

    res.send(userData)
})
*/

module.exports = router