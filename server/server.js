require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-route");
const userData = require("./router/user-data");
const connectDb = require("./utils/db");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, DELETE, PUT, PATCH",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/", authRoute);
app.use("/", contactRoute);
app.use("/", userData);

connectDb();

app.listen(3001);
