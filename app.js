const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const nodemailer = require('nodemailer');

require('dotenv').config();
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

console.log(process.env.EMAIL);
console.log(process.env.PASSWORD);
// Serve static files from the public folder
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Route for the home page
app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => res.render('about'));
app.get('/projects', (req, res) => res.render('projects'));
app.get('/contact', (req, res) => res.render('contact'));


// Start the server
app.listen(port, () => {
  console.log(`Portfolio app listening at http://localhost:${port}`);
});


let transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

console.log(process.env.EMAIL);
console.log(process.env.PASSWORD);
app.post('/contact', (req, res) => {
    console.log(req.body);

  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  let mailOptions = {
    from: email,
    to: 'osnysten@outlook.com',
    subject: `Message from ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('error');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('success');
    }
  });
});
