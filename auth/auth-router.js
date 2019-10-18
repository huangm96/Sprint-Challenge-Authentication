const router = require('express').Router();
const authModel = require('./auth-model.js');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = require('../config/secrets.js')


router.post('/register', (req, res) => {
  // implement registration
  const hash = bcrypt.hashSync(req.body.password, 14);
  req.body.password = hash;

  authModel.addUser(req.body).then(user => {
    res.status(201).json({message:"Account created!"})
  }).catch(err => {
    res.status(500).json({message:'Failed to register',err})
  })
});

router.post('/login', (req, res) => {
  // implement login
  authModel
    .findByUsername(req.body.username)
    .then(user => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateToken(user)
        res.status(200).json({ message: `Hi! ${user.username}`,token });
      } else res.status(401).json({ message: "Can't find user" });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to login", err });
    });
  
});

function generateToken(user) {
  const payload = {
    username: user.username,
    subject: user.id,
    
  };
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
