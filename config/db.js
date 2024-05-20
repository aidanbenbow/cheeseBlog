
const mongoose = require('mongoose'),

connectDB = async ()=>{
    try {
        const conn = mongoose.connect(process.env.DORCAS_DB)
        console.log(`connected `)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB
