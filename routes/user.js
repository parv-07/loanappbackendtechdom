const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = require('../config/prod');
// const requireLogin = require('../middleware/requireLogin');
const nodemailer = require('nodemailer');
// const sendgridTransport = require('nodemailer-sendgrid-transport')
// const { EMAIL } = require('../config/prod');
// const { SendingMail } = require('../routes/nodemailer');
const authController = require('./../controllers/authController');

router.post('/signup', authController.signup);

router.post('/signin', authController.signin);

module.exports = router;
