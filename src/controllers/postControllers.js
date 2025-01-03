import { ApiError } from "../../../../Youtube/server/src/utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {Post} from "../models/Post.models.js"
import mongoose from "mongoose"



const getAllPosts = asyncHandler( async (req, res) => {
    const posts = await Post.find({ }).sort({ createdAt: -1 });
    try {
        return res
        .status(200)
        .json(new ApiResponse(200, {posts}, "All posts"))
    } catch (error) {
        throw new ApiError(400, "something went wrong while fetching ")
    }
})

const getPost = asyncHandler( async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(404, "Post does not exist")
    }

    try {
        const post = await Post.findById(id);

        if(!post){
            throw new ApiError(400, "cant find post")
        }

        return res
        .status(200)
        .json(new ApiResponse(200, {post}, "post deleted"))

    } catch (error) {
        throw new ApiError(400, "something went wrong")
    }
})

const createPost = asyncHandler(async (req, res) => {
    if (!req.body) {
        throw new ApiError(400, 'Request body is missing');
    }

    const {date, title, content} = req.body
    
    // Validate title and content (date can use default)
    if (!title || !content) {
        throw new ApiError(400, "Title and content are required");
    }

    if([title, content].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Fields cannot be empty strings");
    }

    try {
        const postData = {
            title,
            content
        };

        // Only add date if it was provided in request
        if (date) {
            postData.date = new Date(date);
        }

        const post = await Post.create(postData);

        if (!post) {
            throw new ApiError(400, "Failed to create post");
        }

        return res
            .status(201)
            .json(
                new ApiResponse(
                    201, 
                    "Post created successfully",
                    post
                )
            );
    } catch (error) {
        console.error("Post creation error:", error);
        throw new ApiError(
            400, 
            `Post creation failed: ${error.message}`
        );
    }
});

const deletePost = asyncHandler( async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(404, "Post does not exists")
    }

    try {
        const post = await Post.findById(id);
        if(!post){
            throw new ApiError(404, "post does not exists")
            
        }
        const deletedPost = await Post.findByIdAndDelete({_id: id})

        return res
        .status(200)
        .json(new ApiResponse(200, {deletedPost}, "post deleted"))

    } catch (error) {
        throw new ApiError(400, "something went wrong while deleting post")
    }

})

const updatePost = asyncHandler( async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(404, "Post does not exists")
    }

    try {
        const post = await Post.findById(id);
        if(!post){
            throw new ApiError(404, "post does not exists")
            
        }
        const updatedPost = await Post.findByIdAndUpdate({_id: id}, {...req.body})

        return res
        .status(200)
        .json(new ApiResponse(200, {updatedPost}, "post updated"))

    } catch (error) {
        throw new ApiError(400, "something went wrong while updating post")
    }
})



export {
    getAllPosts,
    getPost,
    createPost,
    deletePost,
    updatePost
}
// export const getAllPosts = async (req, res) => {
//     res.json({mdg:"backend server s running"})
// }
