import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * The `login` function in TypeScript handles user authentication by checking the email and password,
 * generating a JWT token upon successful login, and returning appropriate responses based on the
 * outcome.
 * @param {Request} req - The `req` parameter in the `login` function stands for the request object,
 * which contains information about the HTTP request that is being made. This object includes details
 * such as the request headers, body, parameters, query strings, and more. In this case, the `req`
 * parameter is of
 * @param {Response} res - The `res` parameter in the `login` function is an object representing the
 * HTTP response that the server sends back to the client. It is an instance of the `Response` class
 * from the Express.js framework. This object is used to send data back to the client, such as JSON
 * responses,
 * @returns If the user is not found, the function will return a 404 status with a JSON response
 * containing the message 'User not found'. If the password does not match, it will return a 401 status
 * with a JSON response containing the message 'Invalid credentials'. If there is an error during the
 * login process, it will return a 500 status with a JSON response containing the message 'Login
 * failed'
 */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed', error });
  }
};

/**
 * The function `register` handles user registration by checking for existing users, hashing the
 * password, and creating a new user in a TypeScript environment.
 * @param {Request} req - The `req` parameter in the `register` function stands for the request object.
 * It contains information about the HTTP request that triggered the function, such as request headers,
 * parameters, body, and more. In this case, the function is expecting a `Request` object, which likely
 * includes the email
 * @param {Response} res - The `res` parameter in the `register` function is an object representing the
 * HTTP response that the server sends back to the client. It allows you to send data back to the
 * client, such as status codes, headers, and the response body. In this function, `res` is used to
 * @returns If the user already exists, the function will return a response with status code 400 and a
 * JSON object with the message 'User already exists'. If the registration is successful, it will
 * return a response with status code 201 and a JSON object with the message 'User registered
 * successfully' along with the user information. If an error occurs during the registration process,
 * it will return a response with status code
 */
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await User.create({
      email, password: hashedPassword,
      role: 'user'
    });

    res.status(201).json({ success: true, message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Registration failed', error });
  }
};
