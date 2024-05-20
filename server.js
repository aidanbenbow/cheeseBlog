const express = require('express'),
app = express(),
expressLayouts = require('express-ejs-layouts'),
indexRouter = require('./routes/index'),
articlesRouter = require('./routes/articles'),
userRouter = require('./routes/user'),
dorcasRouter = require('./routes/dorcas'),
connectDB = require('./config/db'),
methodoverride = require('method-override')

dotenv= require('dotenv').config()

connectDB()




app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodoverride('_method'))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/', indexRouter)
app.use('/articles', articlesRouter)
app.use('/user', userRouter)
app.use('/dorcas', dorcasRouter)



app.listen(process.env.PORT || 3000)