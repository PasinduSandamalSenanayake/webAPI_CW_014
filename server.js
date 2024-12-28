const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

// paths
const authRoutes = require("./routes/auth-route");
const routeRoutes = require("./routes/route-route");
const busRoutes = require("./routes/bus-route");
const tripRoutes = require("./routes/trip-route");
const reservationRoutes = require("./routes/reservation-route");
const bookingRoutes = require("./routes/book-route");

const app = express();

// //  frontend code
// // Enable CORS Middleware (cleaned up)
// app.use(
//   cors({
//     origin: "https://webapicw.vercel.app", // Replace with your frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
//     allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
//     credentials: true, // If you're sending cookies or authentication headers
//   })
// );

// // Middleware to handle OPTIONS requests (preflight)
// app.options("*", (req, res) => {
//   res.header("Access-Control-Allow-Origin", "https://webapicw.vercel.app"); // https://localhost:3000
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.status(204).send(); // No content for OPTIONS
// });

const allowedOrigins = ["https://webapicw.vercel.app"]; // Add other origins if needed

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Enable credentials if needed
  })
);

// Middleware to handle preflight requests
app.options("*", cors());

app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/routes", routeRoutes);
app.use("/buses", busRoutes);
app.use("/trips", tripRoutes);
app.use("/reservations", reservationRoutes);
app.use("/bookings", bookingRoutes);
app.use(cors());

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//     app.listen(process.env.PORT1, () => {
//       console.log(`Server running on port ${process.env.PORT1}`);
//     });
//   })
//   .catch((err) => console.error(err));

// mongoose
//   .connect(
//     "mongodb+srv://pasindusenanayake222:2sURlmyWzpJP57R3@cluster.h1feo.mongodb.net/userDB",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => {
//     console.log("Connected to MongoDB");
//     const PORT = process.env.PORT1;
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });

const PORT = process.env.PORT1;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
