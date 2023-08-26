const express = require("express");

const dotenv = require("dotenv");
const mongoose = require("mongoose");

const cors = require("cors");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
dotenv.config();
require("./models/otpAuth");
require("./models/user");
require("./models/admin");
require("./models/event");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(cors());

const userRouter = require("./routes/authRoutes");
const dashboardRouter = require("./routes/userDashboardRoutes");
const paymentRouter = require("./routes/paymentRoute");
const adminRouter = require("./routes/adminRoutes");
const eventRouter = require("./routes/eventRoutes");
// const checkInRouter = require("./routes/checkInRoutes")

app.use("/", paymentRouter);
app.use("/user", userRouter);
app.use("/user", dashboardRouter);

app.use("/", adminRouter);
app.use("/", eventRouter);

//database url

mongoose
  .connect(process.env.MONGO_ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Event Management micro services API.");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server Running on🚀: ${process.env.PORT}`);
});
