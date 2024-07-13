const bcrypt = require('bcrypt');
const User = require('../models/registerModels');

const isStringValid = (inputString) => {
  return typeof inputString === 'string' && inputString.trim().length > 0;
};

const Register = async (req, res) => {
  const { name, email, password, phone, profession } = req.body;

  try {
   
    if (!isStringValid(name) || !isStringValid(email) || !isStringValid(password) || !isStringValid(phone) || !isStringValid(profession)) {
      return res.status(400).json({ msg: 'Input values are not valid' });
    }

 
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      profession
    });

  
    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid user credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid user credentials' });
    }
    res.json({ msg: 'User authenticated successfully' });
  } catch (err) {
    console.error('Error logging in:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  Register,
  Login
};
