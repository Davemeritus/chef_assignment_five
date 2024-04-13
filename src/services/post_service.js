// Import the Post schema from the database
import Post from "../database/schema/post_schema.js";

// Function to get all posts with pagination and sorting
export const getAllPosts = async ({
  limit = 10, // Default limit is 10
  page = 1, // Default page is 1
  order = "desc", // Default order is descending
  orderBy = "createdAt", // Default order by is createdAt
}) => {
  // Calculate the number of posts to skip based on the current page and limit
  const skip = (page - 1) * limit;

  // Create a sort options object based on the order and orderBy parameters
  const sortOptions = { [orderBy]: order };

  // Find all posts, populate the user field, sort them, skip the necessary amount, and limit the results
  const posts = await Post.find({})
    .populate("user", "")
    .sort(sortOptions)
    .skip(skip)
    .limit(parseInt(limit));

  // Return the posts
  return posts;
};

// Function to get a single post by id
export const getSinglePost = async (id) => {
  // Find the post by id and populate the user field
  const post = await Post.findById(id).populate("user", "");

  // Return the post
  return post;
};

// Function to update a post by id
export const updatePost = async (id, updateField) => {
  // Find the post by id, update it with the provided fields, and populate the user field
  const post = await Post.findByIdAndUpdate(id, updateField).populate(
    "user",
    "",
  );

  // Return the updated post
  return post;
};

// Function to delete a post by id
export const deletePost = async (id) => {
  // Find the post by id and delete it, then populate the user field
  const post = await Post.findByIdAndDelete(id).populate("user", "");

  // Return the deleted post
  return post;
};

// Function to create a new post
export const createPost = async (title, body, user) => {
  // Log the user to the console
  console.log(user);

  // Create a new post with the provided title, body, and user
  const newPost = new Post({
    title,
    body,
    user,
  });

  // Save the new post to the database
  await newPost.save();

  // Populate the user field of the new post
  await newPost.populate("user", "");

  // Return the new post
  return newPost;
};