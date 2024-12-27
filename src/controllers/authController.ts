import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
