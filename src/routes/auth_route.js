import { Router } from 'express';
import * as authController from '../controller/auth_controller.js';

// Create a new router instance
const authRoute = Router();

// Define the registration route
authRoute.post('/register', authController.register);

// Define the login route
authRoute.post('/login', authController.login);

// Export the configured router
export default authRoute;
