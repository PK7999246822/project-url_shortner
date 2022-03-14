const express = require('express');
const router = express.Router();

const AuthorController= require("../controllers/authorController")
const BlogController= require("../controllers/blogController")


router.post("/authors", AuthorController.createAuthor)

router.post("/blogs", BlogController.createBlog)

router.get("/blogs", BlogController.getAllBlogs)

router.put("/blogs/:blogId", BlogController.updateBlog)

router.delete("/blogs/:blogId", BlogController.deleted)

router.delete("/blogs", BlogController.Qdeleted)


module.exports = router;