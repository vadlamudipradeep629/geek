
const User = require('../models/registerModels');



const getUsers =  async(req,res)=>{
    try {
        const users = await User.find();
      
        res.json(users);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
};
const updateUser = async (req,res)=>{
  const { name, phone } = req.body;

  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    await user.save();
    res.json({ msg: 'User updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};



const deleteUser = async(req ,res)=>{
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    await User.deleteOne({ _id: req.params.id });
    res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}



module.exports = {
    getUsers,
    updateUser,
    deleteUser
}