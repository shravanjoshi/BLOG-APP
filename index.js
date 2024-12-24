const express = require('express');
const path = require('path');
const app = express();
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const { connect } = require('mongoose')
const cookieParser = require('cookie-parser');
const { checkForAuthentication } = require('./middlewares/auth');
const Blog = require('./models/blog');
const PORT = 8005;

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'))

connect('mongodb://localhost:27017/blog-app').then(()=>console.log('MongoDB Connected!'));

app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(checkForAuthentication("token"));
app.use(express.static('./public'));

app.get('/',async (req,res)=>{
    const allBlogs = await Blog.find({});
    return res.render('home',{
        user: req.user,
        blogs: allBlogs,
    });
})


app.use('/user', userRouter);
app.use('/blog', blogRouter);

app.listen(PORT,()=> console.log('Server Started!'));