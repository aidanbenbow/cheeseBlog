const articles = require('../models/articles')


const allArticles = async (req,res)=>{
const arts = await articles.find()

    res.render('index', {articles: arts})
}

module.exports = {
    allArticles
}