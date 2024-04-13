import { Router } from 'express';
import * as postController from '../controller/post_controller.js';
import { authMiddleware } from '../middleware/auth_middleware.js';

// Initialize a Router instance for post routes
const postRoute = Router();

// Route to create a new post, requires authentication
postRoute.post("/", authMiddleware, postController.createPost);

// Route to retrieve a single post by ID, requires authentication
postRoute.get("/:id", authMiddleware, postController.getSinglePost);

// Route to update an existing post by ID, requires authentication
postRoute.patch("/:id", authMiddleware, postController.updatePost);

// Route to delete an existing post by ID, requires authentication
postRoute.delete("/:id", authMiddleware, postController.deletePost);

// Route to retrieve all posts, does not require authentication
postRoute.get("/", postController.getAllPosts);

// Export the configured router
export default postRoute;
