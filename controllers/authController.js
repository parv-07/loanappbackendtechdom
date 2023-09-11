// const User = require('./../models/user');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Tera hone laga hu';
exports.signup = async (req, res) => {
  const { userName, email, password, userType } = req.body;
  if (!email || !password || !userName) {
    return res.status(422).json({ error: 'please add all the fields' });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: 'user already exists with that email' });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const newUser = new User({
          email,
          password: hashedpassword,
          userName,
          userType,
        });
        console.log(newUser);
        newUser
          .save()
          .then((newUser) => {
            // SendingMail(
            //   '<p>Welcome! We are honored to receive you like your presence is crucial!</p>',
            //   'Account created successfully',
            //   user.email
            // );
            res.json({ message: 'saved successfully' });
            // res.json({ user: { userName, email, userType } });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: 'please add email or password' });
  }
  User.findOne({ email: email }).then((savedUser) => {
    console.log(savedUser);
    console.log('email', email);
    if (!savedUser) {
      return res.status(422).json({ error: 'Invalid Email or password' });
    }
    // console.log(bcrypt(savedUser.password));
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          //res.json({message:"successfully signed in"})
          console.log(JWT_SECRET);
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          console.log('hellooww 1');
          const { userName, email, _id } = savedUser;
          res.json({
            token,
            user: { userName, email, _id },
          });
        } else {
          console.log('hellooww 2');
          return res.status(422).json({ error: 'Invalid Email or password' });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
