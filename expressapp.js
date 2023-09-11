const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port = 5500; // Use the provided port or default to 3000

var db =
  'mongodb+srv://parvkothari14:q7E1y0d1R4dVhWXc@cluster0.mwu0rtf.mongodb.net/MiniLoanLoginDatabase?retryWrites=true&w=majority';
app.use(cors());
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('conneted to mongo yeahh');
});
mongoose.connection.on('error', (err) => {
  console.log('err connecting', err);
});
require('./models/user');
require('./models/LoanDetails');
app.use(express.json());
app.use(require('./routes/user'));
app.use(require('./routes/LoanDetails'));
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
