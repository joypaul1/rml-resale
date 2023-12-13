require('dotenv').config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
// const corsOptions = {
//   origin: "http://localhost:your_react_port", // Update with your React app's URL
//   methods: "POST",
// };



// app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: "test.rangsmotors.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.REACT_APP_EMAIL_USER,
    pass: process.env.REACT_APP_EMAIL_PASSWORD,
  },
});

app.post("/send-email", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
      from: email,
      to: "joy@test.rangsmotors.com",
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
    };
    const info = await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email", details: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
