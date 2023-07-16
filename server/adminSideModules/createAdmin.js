const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const express = require('express');
const router = express.Router();
const Admin = require('../models/adminSchema');

// Admin Signin
module.exports = router.post("/signupAdmin", async (req, res) => {
    try {
      const { adminName, email, phone, adminPassword, cPassword } = req.body;

      // Check if admin with the same email already exists
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ error: 'Admin with this email already exists' });
      }

      // Create a new admin instance
      const newAdmin = new Admin({
        adminName,
        email,
        phone,
        adminPassword,
        cPassword
      });

      // Hash the admin's password
      newAdmin.adminPassword = await bcrypt.hash(adminPassword, 12);
      newAdmin.cPassword = await bcrypt.hash(cPassword, 12);

      // Generate auth token for the new admin
      const token = await newAdmin.generateAuthToken();

      // Save the new admin to the database
      await newAdmin.save();

      res.status(201).json({ message: 'Admin signup successful', token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  })


