const mongoose = require("mongoose");

const userDB = mongoose.createConnection(
  "mongodb+srv://pasindusenanayake222:2sURlmyWzpJP57R3@cluster.h1feo.mongodb.net/userDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const tripDB = mongoose.createConnection(
  "mongodb+srv://pasindusenanayake222:2sURlmyWzpJP57R3@cluster.h1feo.mongodb.net/tripDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const routeDB = mongoose.createConnection(
  "mongodb+srv://pasindusenanayake222:2sURlmyWzpJP57R3@cluster.h1feo.mongodb.net/routeDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const busDB = mongoose.createConnection(
  "mongodb+srv://pasindusenanayake222:2sURlmyWzpJP57R3@cluster.h1feo.mongodb.net/busDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const reservationDB = mongoose.createConnection(
  "mongodb+srv://pasindusenanayake222:2sURlmyWzpJP57R3@cluster.h1feo.mongodb.net/reservationDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const bookingDB = mongoose.createConnection(
  "mongodb+srv://pasindusenanayake222:2sURlmyWzpJP57R3@cluster.h1feo.mongodb.net/bookingDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = {
  userDB,
  tripDB,
  routeDB,
  busDB,
  reservationDB,
  bookingDB,
};
