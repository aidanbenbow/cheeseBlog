const Dorcas = require('../models/dorcasLetters')


const createLetter = async (req, res)=>{


    const letter = await Dorcas.create({
name: req.body.name,
sponsor: req.body.sponsor,
text: req.body.text
    })

    console.log(letter)
    
    letter.save()

    res.render('/')
}

const updateLetter = (req, res)=>{
    res.json({mes: 'logIn USer'})
}

const getLetter = (req, res)=>{
    res.render('/')
}

module.exports = {
    createLetter,
    updateLetter,
    getLetter
}