// Importing required modules
import Jwt from "jsonwebtoken"; // JSON Web Token for creating access tokens
import User from "../database/schema/user_schema.js"; // User schema from the database
import bcrypt from "bcrypt"; // bcrypt for password hashing
import { ErrorWithStatusCode } from "../exceptions/customErrorConstructor.js"; // Custom error constructor

// Function to register a new user
export const register = async (
  name,
  email,
  password,
  confirmPassword,
  role,
) => {
  // Check if a user with the provided email already exists
  const user = await User.findOne({ email });

  // If the password and confirm password do not match, throw an error
  if (password !== confirmPassword) {
    throw new ErrorWithStatusCode("Password does not match", 400);
  }

  // If a user already exists with the provided email, throw an error
  if (user) {
    throw new ErrorWithStatusCode("user already exists", 400);
  }
  
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user with the provided details
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // Save the new user to the database
  await newUser.save();

  // Remove the password from the user object before returning it
  delete newUser.password;

  // Return the new user
  return newUser;
};

// Function to login a user
export const login = async (email, password) => {
  // Find the user with the provided email
  const user = await User.findOne({ email });

  // If the user does not exist or the provided password does not match the user's password, throw an error
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new ErrorWithStatusCode("Unauthorized", 401);
  }

  // Get the JWT secret from environment variables or use "secret" as a default
  const JWTSecret = process.env.JWTSECRET || "secret";

  // Create an access token with the user's role, email, and id
  const accessToken = Jwt.sign(
    {
      role: user.role || "USER",
      email: user.email,
      _id: user._id,
    },
    JWTSecret,
    {
      expiresIn: "20m", // The token will expire in 20 minutes
    },
  );

  // Return the access token and the user
  return {
    accessToken,
    user,
  };
};