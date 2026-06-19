const express = require('express')
const postController = require('../controllers/post.controller')
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const postRouter = express.Router()

/**
 * POST /api/posts/ [protected]
 */
postRouter.post("/", upload.single('Image'),postController.createPostController)

/**
 * GET /api/posts [protected]
 */
postRouter.get("/",postController.getPostController)

/**
 * GET /api/posts/details/:postId [protected]
 */
postRouter.get("/details/:postId", postController.getPostDetailsController)


module.exports = postRouter