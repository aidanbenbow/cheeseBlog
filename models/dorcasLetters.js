const mongoose = require('mongoose'),

dorcasLetterSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add Name']
    },
    sponsor: {
        type: String,
        required: [true, 'Please add sponsor']
    },
    text: {
        type: String,
        required: [false, 'Please add text']
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('DorcasLetter', dorcasLetterSchema)