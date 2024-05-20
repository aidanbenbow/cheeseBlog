const mongoose = require('mongoose'),
marked = require('marked'),
createDomPurify = require('dompurify'),
{JSDOM} = require('jsdom'),
dompurify = createDomPurify(new JSDOM().window),

articlesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: true
    },
    sanitisedHtml:{
        type: String,
        requied: true
    }
}, {
        timestamps: true
    }
)

articlesSchema.pre('validate', function(next){
if(this.text){
    this.sanitisedHtml = dompurify.sanitize(marked.parse(this.text))
}

    next()
})

module.exports = mongoose.model('Articles', articlesSchema)