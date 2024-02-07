// server.js

const express = require('express');
const bodyParser = require('body-parser');
const User = require('./User');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());


app.use(cors());


app.post('/api/signup', async (req, res) => {
    try {
      const { username, email, password, age, dob, contact, address } = req.body;
      const user = new User({ username, email, password, age, dob, contact, address });
      await user.save();
      res.json({ success: true, message: 'User signed up successfully' });
    } catch (error) {
      console.error('Error signing up:', error);
      res.status(500).json({ success: false, message: 'Error signing up' });
    }
  });

app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email, password });
      if (user) {
        res.json({ success: true, user, message: 'Login successful' });
      } else {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ success: false, message: 'Error logging in' });
    }
  });

  app.put('/api/user/:email', async (req, res) => {
    try {
      const email = req.params.email;
      const updatedUserData = req.body; 
     
      const updatedUser = await User.findOneAndUpdate({ email: email }, updatedUserData, { new: true });
      if (updatedUser) {
        res.json({ success: true, user: updatedUser, message: 'User details updated successfully' });
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    } catch (error) {
      console.error('Error updating user details:', error);
      res.status(500).json({ success: false, message: 'Error updating user details' });
    }
  });


app.get('/', (req, res) => {
  res.send('Server is running'); 
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
