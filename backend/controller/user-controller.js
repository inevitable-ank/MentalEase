import User from '../models/userModel.js';
import Journal from '../models/journalModel.js';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import bcrypt from 'bcryptjs';


// User Signup
// User Signup
export const userSignup = async (req, res) => {
  try {
      let exist = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
      if (exist) {
          return res.status(409).json({ msg: 'Username or email already exists!' });
      }
      const newUser = new User(req.body);
      if (req.file) {
          newUser.profilePicture = req.file.path; // save the file path to the user document
      }
      await newUser.save();
      return res.status(200).json(newUser);
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};



// User Login

export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username with optimized query
    const user = await User.findOne({ username }).select('+password');

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Use async bcrypt comparison for better performance
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user._id, 
        username: user.username 
      },
      process.env.JWT_SECRET || 'MananShreya',
      { expiresIn: '24h' }
    );

    console.log('Generated token:', token); // Debug log

    // Remove password from user object before sending
    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      gender: user.gender,
      age: user.age,
      bio: user.bio,
      profilePicture: user.profilePicture,
      journals: user.journals
    };

    console.log('Sending response with token:', { user: userWithoutPassword, token }); // Debug log

    // Return user details and token
    return res.status(200).json({ 
      user: userWithoutPassword,
      token 
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const { username } = req.params;

    // Find the user by username
    const user = await User.findOneAndDelete({ username });
    console.log(user);
    if (!user) {
      return res.status(404).json({ msg: 'User not found!' });
    }

    // Delete all journals associated with the user
    await Journal.deleteMany({ _id: { $in: user.journals } });

    return res.status(200).json({ msg: 'User and associated journals deleted successfully!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update User
// export const updateUser = async (req, res) => {
//   try {
//     const { username } = req.params;

//     // Validate request body
//     if (!req.body || Object.keys(req.body).length === 0) {
//       return res.status(400).json({ msg: 'No data provided to update!' });
//     }

//     // Define the fields that can be updated
//     const allowedUpdates = ['name', 'email', 'bio', 'password', 'age', 'gender']; // Include 'password' for updating
//     const updates = Object.keys(req.body);
//     const isValidUpdate = updates.every(update => allowedUpdates.includes(update));

//     if (!isValidUpdate) {
//       return res.status(400).json({ msg: 'Invalid updates!' });
//     }

//     // Hash the password if it is being updated
//     if (req.body.password) {
//       const salt = await bcrypt.genSalt(10);
//       req.body.password = await bcrypt.hash(req.body.password, salt);
//     }

//     // Find and update the user
//     const user = await User.findOneAndUpdate({ username }, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!user) {
//       return res.status(404).json({ msg: 'User not found!' });
//     }

//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

export const updateUser = async (req, res) => {
  try {
      const { username } = req.params;

      if (!req.body && !req.file) {
          return res.status(400).json({ msg: 'No data provided to update!' });
      }

      const allowedUpdates = ['name', 'email', 'bio', 'password', 'age', 'gender', 'profilePicture'];
      const updates = Object.keys(req.body);
      if (req.file) updates.push('profilePicture');
      const isValidUpdate = updates.every(update => allowedUpdates.includes(update));

      if (!isValidUpdate) {
          return res.status(400).json({ msg: 'Invalid updates!' });
      }

      if (req.body.password) {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
      }

      if (req.file) {
          req.body.profilePicture = req.file.path;
      }

      const user = await User.findOneAndUpdate({ username }, req.body, {
          new: true,
          runValidators: true,
      });

      if (!user) {
          return res.status(404).json({ msg: 'User not found!' });
      }

      return res.status(200).json(user);
  } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: error.message });
  }
};



export const getUserDetails = async (req, res) => {
  try {
    // Find the user based on the username provided in the request parameters
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      // If user not found, send 404 status with error message
      return res.status(404).json({ error: 'User not found' });
    }

    // If user found, send user details in the response
    res.json(user);
  } catch (error) {
    // If any error occurs, send 500 status with error message
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};