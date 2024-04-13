import Jwt from 'jsonwebtoken';
import { ErrorWithStatusCode } from '../exceptions/customErrorConstructor.js';

export const authMiddleware = (req, res, next) => {
  // Extract the authorization header from the request
  const authorization = req.headers.authorization;

  // Check if the authorization header is missing
  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized: No authorization header" });
  }

  // Split the authorization header to separate the bearer token
  const bearerToken = authorization.split(' ');

  // Ensure the bearer token consists of exactly two parts
  if (bearerToken.length !== 2) {
    return res.status(401).json({ message: "Unauthorized: Malformed token" });
  }

  // Verify the JWT token
  Jwt.verify(bearerToken[1], process.env.JWTSECRET, (err, decoded) => {
    if (err) {
      // Log the error and return an unauthorized response if token verification fails
      console.log(err);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Assign the decoded user to the request object and proceed
    req.user = decoded;
    next();
  });
};
