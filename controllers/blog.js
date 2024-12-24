const Blog = require('../models/blog');
const Comment = require('../models/comment');

async function handleCreateBlog(req,res){
    const { title, body } = req.body;
    const blog = await Blog.create({
        title: title,
        body: body,
        coverImageUrl: `/uploads/${req.file.filename}`,
        createdBy: req.user._id,
    })
    return res.redirect(`/blog/${blog._id}`);
}

async function handleGetBlog(req,res){
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const allComments = await Comment.find({ blogId: req.params.id }).populate("createdBy")
    return res.render('blog',{
        user: req.user,
        blog,
        comments: allComments,
    });
}

async function handleCreateComment(req,res){
    const blogId = req.params.id;
    await Comment.create({
        content: req.body.content,
        createdBy: req.user._id,
        blogId,
    })
    return res.redirect(`/blog/${blogId}`);
}

module.exports = { handleCreateBlog, handleCreateComment, handleGetBlog };