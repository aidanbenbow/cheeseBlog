const Articles = require('../models/articles'),
User = require('../models/user'),
bcrypt = require('bcrypt'),
jwt = require('jsonwebtoken'),
asyncHandler = require('express-async-handler')

const registerUser = asyncHandler( async (req, res)=>{
const {name, email, password } = req.body

if(!name||!email||!password){
    res.status(400)
    throw new Error('please add all fields!')
}

const userexists = await User.findOne({email})

if(userexists){
    res.status(400)
    throw new Error('user already exists!')
}

const salt = await bcrypt.genSalt()
const hasedPassword = await bcrypt.hash(password, salt)

const user = await User.create({
    name,
    email,
    password: hasedPassword,
   
})

console.log(user._id)

if(user){
    //res.status(200)
    res.send({
       name: user.name,
       email: user.email,
       token: generateToken(user._id)
    })
} else{
    res.status(400)
    throw new Error('invalid data!')
}

   // res.render('user/login')
})

const logInUser = async (req, res)=>{
    const {name, password } = req.body
    const user = await User.findOne({name})

    req.headers.authorization = generateToken(user._id)

    console.log(req.headers.authorization)

    if(user && (await bcrypt.compare(password, user.password)) ){
        const articlesThis = await Articles.find()
        
        res.render('articles/index', {articles: articlesThis})
    } else{
        res.send('error')
    }
}

const logInPage = (req, res)=>{
    res.render('user/login')
}

const getMe = (req, res)=>{
    res.render('user/user')
}

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '30d'})
}

module.exports = {
    registerUser,
    logInUser,
    getMe,
    logInPage
}