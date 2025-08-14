const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs").promises;
const path = require("path");
const nodemailer = require("nodemailer");

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic Route
app.get("/", (req, res) => {
  res.json({ message: "Portfolio Backend API is Running!" });
});

// Contact Form End Route
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    // Basic Validation
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, error: "Please fill all the fields" });
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, error: "Please enter a valid email" });
    }

    // Create contact data object
    const contactData = {
      id: Date.now().toString(),
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    };

    // Save data to JSON file
    console.log("Saving contact message...");
    await saveContactMessage(contactData);
    console.log("Contact message saved successfully.");

    // Send email notification
    console.log("Sending email notification...");
    await sendEmailNotification(contactData);
    console.log("Email notification sent successfully.");

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: "Server error. Please try again later.",
      });
    }
  }
});

// Get all messages
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await getContactMessages();
    res.json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, error: "Failed to fetch messages" });
  }
});

//Helper function to save contact messages
async function saveContactMessage(contactData) {
  const filePath = path.join(__dirname, "data", "messages.json");

  try {
    //Ensure data directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    let messages = [];
    try {
      const data = await fs.readFile(filePath, "utf-8");
      messages = JSON.parse(data);
    } catch (err) {
      // File doesn't exist yet, start with an empty array
    }

    messages.push(contactData);
    await fs.writeFile(filePath, JSON.stringify(messages, null, 2));
  } catch {
    throw new Error("Failed to save contact message");
  }
}

// Helper function to get all contact messages
async function getContactMessages() {
  const filePath = path.join(__dirname, "data", "messages.json");

  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return []; // Return an empty array if file doesn't exist
  }
}

// Helper function to send email notification
async function sendEmailNotification(contactData) {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to yourself
    subject: `New Portfolio Contact: ${contactData.name}`,
    html: `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${contactData.name}</p>
    <p><strong>Email:</strong> ${contactData.email}</p>
    <p><strong>Message:</strong></p>
    <p>${contactData.message.replace(/\n/g, "<br>")}</p>
    <p><strong>Submitted:</strong> ${new Date(
      contactData.timestamp
    ).toLocaleString()}</p>
    `,
    replyTo: contactData.email,
  };

  // Send email
  await transporter.sendMail(mailOptions);
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: "Something went wrong" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
