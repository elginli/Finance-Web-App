const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/home', async(req,res) => {
    const {email, budget, month, year, food, home, school, transportation, entertainment, personal, savings} = req.body

    const newUserData = new schemas.UserData({email: email, budget: budget, month: month, year: year, food: food, home: home, school: school, transportation: transportation, entertainment: entertainment, personal: personal, savings: savings})
    const saveUserData = await newUserData.save()

    if (saveUserData) {
        console.log(`POST /home | Email: ${email}, Budget: ${budget}, Month: ${month}, Year: ${year}, Food: ${food}, Home: ${home}, School: ${school}, Transportation: ${transportation}, Entertainment: ${entertainment}, Personal: ${personal}, Savings: ${savings}`)
        res.send('Data recieved')
    } else {
        res.send('Error')
    }

    res.end()
})

router.post('/userData', async(req, res) => {
    const {email, month, year} = req.body
    console.log("POST /uesrData | Received:", email, month, year)

    try {
        const budgetData = await schemas.UserData.findOne({ email, month, year })
        console.log("Found data:", budgetData)

        if (budgetData) {
            return res.json(budgetData)
        } else {
            res.status(404).json({ message: 'No data found for the specified parameters.' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/login', async(req, res) => {
    console.log(req.body)
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send({ status: "error", message: "Email and password are required." })
    }

    try {
        const existingUser = await schemas.Users.findOne({ email: email })
        if (!existingUser) {
            return res.status(404).send({ status: "notexist", message: "User not found." })
        }
        
        //checks hashed password
        const isMatch = await bcrypt.compare(password, existingUser.password)
        if (isMatch) {

            const token = jwt.sign({ userId: existingUser._id, email: existingUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' })
            
            console.log('token stored: ', existingUser._id, existingUser.email)
            res.send({ status: "exist", message: "Logged In", token: token })

        } else {
            res.status(401).send({ status: "notexist", message: "Invalid credentials." })
        }
    } catch (e) {
        console.error('Login error:', e)
        res.status(500).send({ status: "error", message: "Internal server error" })
    }
})

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body

    try {
        // Check if user already exists
        const existingUser = await schemas.Users.findOne({ email: email })
        if (existingUser) {
            return res.status(400).send('Email already in use')
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create a new user instance and save it to the database
        const newUser = new schemas.Users({
            name: name,
            email: email,
            password: hashedPassword
        });

        const saveUser = await newUser.save()
        res.status(201).send({ message: 'User created successfully', userId: saveUser._id })
    } catch (e) {
        res.status(500).send('Server error')
        console.error(error)
    }
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(401).json({ message: "No token provided" })

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                console.log("JWT verification error:", err)
                return res.status(403).json({ message: "Invalid or expired token" })
            }
        
            try {
                const currentUser = await schemas.Users.findById(decoded.userId)
                if (!currentUser) {
                    console.log("Decoded token data:", decoded)
                    console.log("User not found with ID:", decoded.userId)
                    return res.status(404).json({ message: "User not found" })
                }
        
                req.user = currentUser
                next();
            } catch (e) {
                console.error('User fetch error:', e);
                return res.status(500).json({ message: "Error fetching user", error: e.toString() })
            }
        })
}


router.get('/user', authenticateToken, async(req, res) => {
    console.log("User route hit")
    try {
        const user = await schemas.Users.findById(req.user._id).select('-password')
        if (!user) {
            console.log("User not found in DB")
            return res.status(404).json({ message: 'User not found.' })
        }
        console.log("Sending user data", user)
        res.send(user)
    } catch (error) {
        console.error('Error fetching user data:', error)
        res.status(500).json({ message: 'Error fetching user data.' })
    }
})

const userData = { 
    name: "Elgin", 
    email: "elginli1025@gmail.com",
    password: "123"
}


module.exports = router