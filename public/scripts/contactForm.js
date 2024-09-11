const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
    service: 'your_email_service_provider', // e.g., 'gmail'
    auth: {
        user: 'your_email@example.com',
        pass: 'your_email_password',
    },
});

// Express route for handling contact form submission
app.post('/submit', (req, res) => {
    const { name, email, contactnumber, message } = req.body;

    // Compose email message
    const mailOptions = {
        from: 'your_email@example.com',
        to: 'recipient_email@example.com', // Replace with the actual email of the recipient
        subject: 'New Contact Form Submission',
        html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Contact Number: ${contactnumber}</p><p>Message: ${message}</p>`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

// Set up static file serving
app.use('/public', express.static(path.join(__dirname, '../public')));

// Set up views directory
app.set('views', path.join(__dirname, '../pages'));
app.set('view engine', 'ejs');

// Main route for serving the HTML page
app.get('/', (req, res) => {
    res.render('contact'); // Assuming your main HTML file is named index.ejs
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
