const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create mail transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Handle Get Involved form submissions
app.post('/api/get-involved', async (req, res) => {
    const { name, email, role, interest, message } = req.body;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'simron@imaginecitizens.ca',
        subject: 'New Get Involved Submission',
        html: `
            <h2>New Get Involved Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Role:</strong> ${role}</p>
            <p><strong>Interest:</strong> ${interest}</p>
            <p><strong>Message:</strong> ${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Submission successful' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending submission' });
    }
});

// Handle Contact form submissions
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'simron@imaginecitizens.ca',
        subject: `New Contact Form: ${subject}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong> ${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Submission successful' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending submission' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 