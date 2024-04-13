import mongoose from "mongoose";

// Define the schema for a user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
}, {
  timestamps: true,
});

// Customize the JSON representation of the documents
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    // Remove the password, _id, and role fields
    delete ret.password;
    delete ret._id;
    delete ret.role;

    // Return the modified document
    return {
      id: ret.id,
      ...ret,
    };
  },
});

// Create and export the model
const User = mongoose.model("User", userSchema);
export default User;