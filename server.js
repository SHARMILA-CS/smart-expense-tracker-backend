require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.get("/_health", (req, res) => res.json({ status: "ok" }));




// Allow deployed frontend (Netlify) to access backend
app.use(cors({
  origin: "https://sunny-cucurucho-93ff97.netlify.app", // your Netlify URL
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true
}));

// Handle preflight requests
app.options("*", cors({
  origin: "https://sunny-cucurucho-93ff97.netlify.app",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true
}));
