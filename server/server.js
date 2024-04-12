import express from 'express';
import configViewEngine from './configs/viewEngine.js';
import initWebRoute from './route/web.js';
import initAPIRoute from './route/api.js';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import auth from './middleware/auth.js';
import jwt from 'jsonwebtoken';
import { IP } from './configs/ip.js';
import nodemailer from "nodemailer";

dotenv.config();
const app = express();
const port = process.env.PORT || 2023;
// console.log(process.env);
app.use(express.urlencoded({ extend: true }));
app.use(express.json());
app.use(cors());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'secret',
    cookie: { maxAge: 10800000 },
  }),
);

// app.use(auth);
// Set up viewEngine
configViewEngine(app);

// Init web route
initWebRoute(app);
initAPIRoute(app);
// Init API route
// POST endpoint to send email
app.post("/send-email", async (req, res) => {
  console.log(req.body);
  const { to, subject, text } = req.body;

  // Configure transporter using your email provider settings
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure:true,
    logger:true,
    debug:true,
    auth: {
      user: "healthcaresystemkl@gmail.com",
      pass: "healthcaresystemlk",
    },
  });

  // Define email options
  let mailOptions = {
    from: "healthcaresystemkl@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    return res.send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).send("Error sending email");
  }
});
app.listen(port, IP,() => {
  console.log(`Example app listening on port ${port}`);
});
