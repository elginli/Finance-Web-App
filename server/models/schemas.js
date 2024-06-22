const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {type:String},
    email: {type:String},
    password: {type:String}
})

const userDataSchema = new Schema({
    email: {type:String},
    month: {type: Number,required: true},
    year: {type: Number,required: true},
    budget: {type: Number,required: true},
    food: {type: Number, default: 0},
    home: {type: Number, default: 0},
    school: {type: Number, default: 0},
    transportation: {type: Number, default: 0},
    fun: {type: Number, default: 0},
    misc: {type: Number, default: 0},
    createdAt: { type: Date, default: Date.now}

})

const Users = mongoose.model('Users', userSchema, 'users')
const UserData = mongoose.model('UserData', userDataSchema, 'user_data')
const mySchemas = {'Users': Users, 'UserData': UserData}

module.exports = mySchemas