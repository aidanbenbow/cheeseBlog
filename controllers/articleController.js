const Articles = require('../models/articles')

const getArticles = async (req,res)=>{
        const articleThis = await Articles.find()
    
        res.render('articles/index', {articles: articleThis})
    }
    
const getNewArticles = (req,res)=>{
        res.render('articles/new', {article: new Articles()})
    }


    

module.exports = {
    getArticles,
    getNewArticles
}