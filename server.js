const express = require("express");
const app = express();
const port = 6000;
const bcrypt = require("bcryptjs");
const session = require("express-session");
app.use(express.json());