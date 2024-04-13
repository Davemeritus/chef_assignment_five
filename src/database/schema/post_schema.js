import mongoose from "mongoose";

// Define the schema for a blog post
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true,
});

// Customize the JSON representation of the documents
postSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    // Remove the _id field
    delete ret._id;

    // Return the modified document
    return {
      id: ret.id,
      ...ret,
    };
  },
});

// Create and export the model
const Post = mongoose.model("Post", postSchema);
export default Post;