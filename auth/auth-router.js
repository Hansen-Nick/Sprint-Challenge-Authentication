const router = require('express').Router();
const bcrypt = require('bcryptjs');
const helpers = require('./authHelpers');
const sessions = require('express-session')

router.post('/register', (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash
  helpers.add(creds)
    .then( user => {
      res.status(201).json({Success: `User registered`})
    })
    .catch( err => {
      res.status(500).json({message: 'Something is wrong on our end!', error: err})
    })
});

router.post('/login', (req, res) => {
  const {username, password} = req.body;

  helpers.findByFilter({username})
  .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({message: `Hello ${user.username}`})
      } else {
        res.status(400).json({message: 'Invalid Credentials'})
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Something is wrong on our end!'})
    })
});

module.exports = router;
