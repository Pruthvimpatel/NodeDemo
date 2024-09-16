const User = require('../models/users');
const Role = require('../models/role');

exports.registerUser = (req, res) => {
  const { username, password, role } = req.body;
  const user = new User({ username, role });

  User.register(user, password, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'User registered successfully' });
  });
};

//Login route

exports.loginUser = (req,res) => {
    const {username,password} = req.body;
    User.authenticate(username,password,(err,user) => {
    if(err || !user) {
    return res.status(401).json({error: 'Invalid credentials'});
    }

    req.session.userId = user._id;
    res.json({message:'Login successfully.'})
    });
}