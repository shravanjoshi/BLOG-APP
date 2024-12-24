const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const { handleCreateBlog, handleCreateComment, handleGetBlog } = require('../controllers/blog');

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()} - ${file.originalname}`);
    }
})
  
const upload = multer({ storage: storage })

router.get('/add-new',(req,res)=>{
    return res.render('addBlog',{
        user: req.user,
    });
})

router.post('/', upload.single('coverImage'), handleCreateBlog);

router.get('/:id', handleGetBlog)

router.post('/comment/:id', handleCreateComment);

module.exports = router;