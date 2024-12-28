import { Request, Response, NextFunction } from 'express';

/**
 * The asyncHandler function in TypeScript is a higher-order function that wraps an asynchronous
 * function with error handling for Express route handlers.
 * @param fn - The `fn` parameter is a function that takes three arguments: `req` (Request object),
 * `res` (Response object), and `next` (NextFunction object) and returns a Promise that resolves to any
 * type of value.
 */
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
