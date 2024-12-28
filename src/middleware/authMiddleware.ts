import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; role: string }; // Adding user to the Request type
    }
  }
}

/**
 * The `authenticate` function is a middleware in TypeScript that verifies a JWT token from the request
 * headers and sets the decoded user information in the request object if valid.
 * @param req - The `req` parameter in the `authenticate` function is the request object representing
 * the HTTP request made by the client to the server. It contains information about the request such as
 * headers, body, parameters, and more.
 * @param res - The `res` parameter in the `authenticate` function is the response object that is used
 * to send a response back to the client making the request. It allows you to set the HTTP status code,
 * headers, and send data back in the response body. In the provided code snippet, `res`
 * @param next - The `next` parameter in the `authenticate` function is a callback function that is
 * used to pass control to the next middleware function in the request-response cycle. When called, it
 * invokes the next middleware function in the stack. This allows you to chain multiple middleware
 * functions together to handle a request in a
 * @returns The `authenticate` function returns either a response with status 401 and a message
 * "Unauthorized" if no token is provided in the request headers, or it returns a response with status
 * 403 and a message "Invalid token" if there is an error verifying the token. If the token is
 * successfully verified, it sets the decoded user information in the request object and calls the
 * `next()` function to proceed
 */
export const authenticate: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return; // Ensure no further execution after sending the response
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded as { id: number; role: string }; // Type assertion
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};
