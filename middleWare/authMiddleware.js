const User = require('../models/user'),
jwt = require('jsonwebtoken'),
asyncHandler = require('express-async-handler')

const protect = asyncHandler( async (req, res, next)=>{
let token

const {name, password } = req.body
console.log(req.body)
res.send('hi')
/*if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
        token = req.headers.authorization.split(' ')[1]

const decoded =  jwt.verify(token, process.env.JWT_SECRET)
    
req.user = User.findById(decoded.id).select('-password')

next()

    } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('not authorized!')
    }
}*/

})


module.exports = {
   protect
    }