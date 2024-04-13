import Jwt from "jsonwebtoken";
import * as authService from "../services/auth_service.js";
import bcrypt from "bcrypt";

/**
 * Registers a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is registered.
 */
export const register = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;

  try {
    const newUser = await authService.register(name, email, password, confirmPassword, role);
    res.json({ message: "User created succesfully", data: newUser });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    const message = err.name === "ValidationError" ? "Validation error" : err.message;
    const errors = err.name === "ValidationError" ? Object.values(err.errors).map((error) => error.message) : undefined;
    res.status(statusCode).json({ message, errors });
  }
};

/**
 * Logs in a user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is logged in.
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = await authService.login(email, password);
    res.json({ message: "Login Successful", data });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ message: err.message });
  }
};