const User = require('../Models/userModel.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
console.log(req.body);
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error('Invalid email or password');
    }

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// signup a user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
console.log(req.body);
  try {
    const exists = await User.findOne({ email });

    if (exists) {
      throw new Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    console.log("password "+password)
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hash });

    // create a token
    
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { signupUser, loginUser }