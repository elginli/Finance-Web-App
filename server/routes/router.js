const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')

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

router.post('/user', (req, res) => {
    const { email, password } = req.body;

    if (email === user.email && password === user.password) {
        res.send({ status: "exist", user: { name: user.name, email: user.email } });
    } else {
        res.send({ status: "notexist" });
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