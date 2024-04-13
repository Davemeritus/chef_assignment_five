import Post from "../database/schema/post_schema.js";

/**
 * Retrieves all posts from the database with options for pagination and sorting.
 *
 * @param {Object} options - The options for retrieving the posts.
 * @returns {Promise<Array>} - A promise that resolves to an array of posts.
 */
export const getAllPosts = async ({ limit = 10, page = 1, order = "desc", orderBy = "createdAt" } = {}) => {
  const skip = (page - 1) * limit;
  const sortOptions = { [orderBy]: order };

  return Post.find()
    .populate("user", "")
    .sort(sortOptions)
    .skip(skip)
    .limit(Number(limit));
};

/**
 * Retrieves a single post by its ID.
 *
 * @param {string} id - The ID of the post.
 * @returns {Promise<Object>} - A promise that resolves to the post.
 */
export const getSinglePost = (id) => Post.findById(id).populate("user", "");

/**
 * Updates a post by its ID.
 *
 * @param {string} id - The ID of the post.
 * @param {Object} updateField - The fields to update.
 * @returns {Promise<Object>} - A promise that resolves to the updated post.
 */
export const updatePost = (id, updateField) => Post.findByIdAndUpdate(id, updateField, { new: true }).populate("user", "");

/**
 * Deletes a post by its ID.
 *
 * @param {string} id - The ID of the post.
 * @returns {Promise<Object>} - A promise that resolves to the deleted post.
 */
export const deletePost = (id) => Post.findByIdAndDelete(id).populate("user", "");

/**
 * Creates a new post.
 *
 * @param {string} title - The title of the post.
 * @param {string} body - The body of the post.
 * @param {string} user - The user who created the post.
 * @returns {Promise<Object>} - A promise that resolves to the new post.
 */
export const createPost = async (title, body, user) => {
  const newPost = new Post({ title, body, user });
  await newPost.save();
  return newPost.populate("user", "").execPopulate();
};