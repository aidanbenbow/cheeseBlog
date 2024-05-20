const express = require('express'),
router = express.Router(),
Articles = require('../models/articles'),
User = require('../models/user'),
multer = require('multer'),
multerS3 = require('multer-s3'),
path = require('path'),
{ getArticles, getNewArticles} = require('../controllers/articleController')
const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const {protect} = require('../middleWare/authMiddleware')


require('dotenv').config()
const { get } = require('.')
const {s3} = require('../config/s3')

const bucketname = process.env.AWS_BUCKET_NAME



const storage = multer.memoryStorage()
const upload = multer({ storage: storage })



//router.get('/', getArticles)

router.get('/new', getNewArticles)

router.get('/:id',async (req,res)=>{
    const articleThis = await Articles.findById(req.params.id)

    if(articleThis == null) res.redirect('/')
    res.render('articles/show', {article: articleThis})
})

router.get('/:id/edit',async (req,res)=>{
    const articleThis = await Articles.findById(req.params.id)
    if(articleThis == null) res.redirect('/')
    res.render('articles/edit', {article: articleThis})
})

router.post('/',
upload.single('pic'),  async (req,res)=>{

    const params = {
        Bucket: bucketname,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    } 
    const command = new PutObjectCommand(params)
     s3.send(command)
    const getObjectParams = {
        Bucket: bucketname,
        Key: req.file.originalname
    }
    const comand = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, comand, { expiresIn: 3600 });

    const user = User.fin

    let article = new Articles({
        title: req.body.title,
      pic: url,
        text: req.body.text
    })

    console.log(article)  
    
    try {
       article = await article.save()
       
      // res.render('articles/new', {article: article})
        res.redirect(`/articles/${article.id}`)
    } catch (error) {
        console.log(error)
        res.render('articles/new', {article: article})
    }
    
})

router.put('/:id', upload.single('pic'), async (req,res)=>{
   

   const params = {
    Bucket: bucketname,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype
}

const command = new PutObjectCommand(params)

s3.send(command)


const getObjectParams = {
    Bucket: bucketname,
    Key: req.file.originalname
}
const comand = new GetObjectCommand(getObjectParams);
const url = await getSignedUrl(s3, comand, { expiresIn: 3600 });

//const url = 'https://apb-articlepics.s3.eu-north-1.amazonaws.com/128px-RicottaSpoon.jpg'

    let article
    try {
        article = await Articles.findById(req.params.id) 
        article.text = req.body.text
        article.pic = url
        await article.save()
        res.redirect(`/articles/${article.id}`)
    } catch (error) {
        res.redirect('/')
    }

    
})

router.delete('/:id', async (req,res)=>{
    


await Articles.findByIdAndDelete(req.params.id)
//res.send('delete')
    res.render('articles/index')
})

module.exports = router