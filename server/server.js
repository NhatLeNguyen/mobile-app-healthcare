import express from 'express';
import configViewEngine from './configs/viewEngine.js';
import initWebRoute from './route/web.js';
import initAPIRoute from './route/api.js';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import auth from './middleware/auth.js';
import jwt from 'jsonwebtoken';
import { IP } from './configs/IP.js';
import nodemailer from "nodemailer";
import path from 'path'
import { fileURLToPath } from 'url';

// Xác định lại __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    // service: "gmail",
    host:"smtp.gmail.com",
    // secure:true,
    // logger:true,
    // debug:true,
    port: 587,
    secure: false,
    auth: {
      user: "healthcaresystemkl@gmail.com",
      pass: "gwci oprp zbsx sege",
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  // Define email options
  let mailOptions = {
    from: "healthcaresystemkl@gmail.com",
    to: to,
    subject: subject,
    text: text,
    attachments : [
      {
        filename: 'healthcare.png',
        path: path.join(__dirname, '../src/assets/images', 'meme.png')
      }
    ]
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
