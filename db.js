// db.js

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://susmitha:123@cluster0.in3fz5r.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true, // Use new URL parser
  useUnifiedTopology: true, // Use new server discovery and monitoring engine
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose;
