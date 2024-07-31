

import User  from '../models/User.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authController = {
  signup: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      const token = jwt.sign({ userId: newUser._id }, process.env.Secret_key, { expiresIn: '1h' });
      console.log(process.env.Secret_key);  
      res.status(201).json({ token, userId: newUser._id });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  signin: async (req, res) => {
    const { email, password } = req.body;

    try {
      
      if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({userId: user._id}, process.env.Secret_key, { expiresIn: '1h' });
      console.log(process.env.Secret_key);  
      
      res.status(200).json({ token, userId: user._id });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
};

export default  authController;