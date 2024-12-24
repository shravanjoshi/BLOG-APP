const { Router } = require('express');
const { handleUserSignIn, handleUserSignUp } = require('../controllers/user')
const router = Router();

router.get('/signup',(req,res)=>{
    return res.render('signup');
})

router.get('/signin',(req,res)=>{
    return res.render('signin');
})

router.post('/signup',handleUserSignUp)

router.post('/signin',handleUserSignIn)

router.get('/signout',(req,res)=>{
    return res.clearCookie("token").redirect('/');
})

module.exports = router;