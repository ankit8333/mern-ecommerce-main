const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// DB Connection
connectDB();

// Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000", // adjust to your frontend URL
    credentials: true
}));
app.use(cookieParser());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/payment", require("./routes/paymentRoutes")); // << Add this line

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
