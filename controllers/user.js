
const User = require('../models/user');

async function handleUserSignUp(req,res){
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect('/');
}

async function handleUserSignIn(req,res){
    const { email, password } = req.body;
    try {
        const token = await User.matchPassword(email, password);
        return res.cookie("token", token).redirect('/');
    } catch (error) {
        return res.render('signin',{
            error: 'Incorrect email or password',
        })
    }
}

module.exports = { handleUserSignIn, handleUserSignUp };