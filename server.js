if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
// const req = require('express/lib/request')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const initializePassport = require('/.passport-config')
initializePassport(passport,email => {
    users.find(user => user.email === email)
})

const users = []

app.set('view-engine','ejs')
app.use(express.urlencoded({extended : false}))
app.user(flash())
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.get('/',(req,res)=>{
    res.render('index.ejs',{name : 'Sahil'})
})

app.get('/login',(req,res)=>{
    res.render('login.ejs',{name:'Sahil'})
})

app.post('/login',(req,res)=>{

})


app.get('/register',(req,res)=>{
    res.render('registration.ejs',{name:'Sahil'})
})

app.post('/register',async (req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        users.push({
            id:Date.now().toString,
            name: req.body.name,
            email: req.body.email,
            password : hashedPassword
        })

        res.redirect('/login')
    } catch{
        res.redirect('/register')
    }

    console.log(users)
    // req.body.email

})
app.listen(3000)