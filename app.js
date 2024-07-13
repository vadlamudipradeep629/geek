
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRegisterRoutes = require('./Routes/registerRouter');
const userRoutes = require('./Routes/userRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/userRegistration', userRegisterRoutes);
app.use('/userLogin', userRegisterRoutes);
app.use('/UserDetails', userRoutes);
app.use('/Users' , userRoutes)
app.use('/DeleteUsers' , userRoutes)

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected...');
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});
