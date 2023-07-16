  const dotenv = require('dotenv');
  dotenv.config();
  const bcrypt = require('bcryptjs');
  const mongoose = require('mongoose');
  const express = require('express');
  const app = express();
  const cookieParser = require("cookie-parser");
  const cors = require('cors');
  const connectDB = require("./database/conn")
  const bodyParser = require('body-parser');
  const nodemailer = require('nodemailer');
  const userSchema = require('./models/userSchema');

  app.use(express.json());
  app.use(cookieParser());
  connectDB()
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));

  app.use(require('./router/auth'));



  const database = {};

  app.post('/forgotpass', (req, res) => {
    const { email } = req.body;

    // Check if the email exists in your user database
    // For the sake of example, we'll assume the email is valid and generate a verification code

    // Generate a verification code
    const verificationCode = generateVerificationCode();

    // Store the verification code with the email in the database
    database[email] = {
      verificationCode,
      verified: false,
    };

    // Send the verification code to the user's email
    sendVerificationCode(email, verificationCode)
      .then(() => {
        res.status(200).json({ message: 'Verification code sent successfully' });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Somethings might wrong" });
      });
  });

  app.post('/verify-code', async (req, res) => {
    const { email, verificationCode } = req.body;
  console.log(email,verificationCode);    
    // Retrieve the stored verification code and verification status from the database
    const storedCode = database[email]?.verificationCode;
    const verified = database[email]?.verified;
        console.log(storedCode,verified);
        console.log(typeof(storedCode),typeof(verified));



    if (verificationCode !== storedCode) {
      return res.status(400).json({ error: 'Incorrect verification code' });
    }

    // Update the verification status in the database
    database[email].verified = true;

    res.status(200).json({ message: 'Verification code is valid' });
  });

  app.post('/update-password', async (req, res) => {
    const { email, password,cPassword } = req.body;

    const verified = database[email]?.verified;

    if (!verified) {
      return res.status(400).json({ error: 'Email is not verified' });
    } else {
      const passwordHash = await bcrypt.hash(password, 12);
      const cPasswordHash = await bcrypt.hash(cPassword, 12);
      userSchema
        .findOneAndUpdate({ email: email }, { $set: { password: passwordHash, cPassword:cPasswordHash } }, { new: true })
        .then((user) => {
          res.status(200).json({ message: 'Password updated successfully' });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ error: 'Something went wrong' });
        });
    }

    delete database[email];
  });

  const generateVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return code;
  };

  const sendVerificationCode = (email, verificationCode) => {
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'sthronesh11@gmail.com',
          pass: 'erwmctdkvawtawfy',
        },
      });

      const mailOptions = {
        from: 'stharonesh11@gmail.com',
        to: email,
        subject: 'Password Reset Verification Code',
        text: `Your verification code is: ${verificationCode}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };

  app.use('/uploads', express.static('uploads'));

  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
