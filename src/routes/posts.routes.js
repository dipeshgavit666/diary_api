import { Router } from "express";
// import express from "express"
import { 
    getAllPosts,
    getPost,
    createPost,
    deletePost,
    updatePost
} from "../controllers/postControllers.js"

const router = Router();

router.route('/').get(getAllPosts)
router.route('/:id').get(getPost)
router.route('/').post(createPost)
router.route('/:id').delete(deletePost)
router.route('/:id').patch(updatePost)
// router.get('/', getAllPosts)

export default router