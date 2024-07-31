import User from '../models/User.js';
import bcrypt from 'bcrypt';

const usercontroller = {
	profile: async (req, res) => {
		try {
			const userID = req.user._id;
			const user = await User.findById(userID);
			
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			res.status(200).json(user);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	update: async (req, res) => {
		try {
			const userID = req.user._id;
			const{username,email,password} = req.body;
			const hashedpassword = await bcrypt.hash(password, 10);
			const newUser = new User({
				username,
				_id:userID,
				email,
				password: hashedpassword,
			  });
			const updatedUser = await User.findByIdAndUpdate(userID, newUser, { new: true });

			if (!updatedUser) {
				return res.status(404).json({ message: 'User not found' });
			}

			res.status(200).json(updatedUser);
		} catch (error) {
			res.status(500).json({ message: error.message});
		}
	},
};

export default usercontroller;