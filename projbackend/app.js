require('dotenv').config();

const mongoose=require('mongoose');
const express = require("express"); 
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors"); 

//my routes
const authRoutes=require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripePayment");
const paymentBRoutes = require("./routes/paymentBRoutes");


//DB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).then(() => {
    console.log("DB CONNECTED VIVEK,,,");
  });
  // .catch(console.log("something is wrong with DB oppsss"));


// var corsOptions = {
//   origin: `http://localhost:3000/`,
//   optionsSuccessStatus: 200,
//   methods: "GET,PUT,POST,DELETE",
// };
// const corsOpts = {
//   origin: "*",

//   methods: ["GET", "POST","PUT","DELETE"],

//   allowedHeaders: ["Content-Type"],
// };

var corsOrigin;

if (process.env.NODE_ENV == "production") {
  console.log("Adding CORS to the headers...");
  corsOrigin = "prodserver";
} else {
  corsOrigin = "http://localhost:3000";
}

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", corsOrigin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.set("Access-Control-Allow-Credentials", "true");
  next();
});

 //middleware 
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
// app.use(cors(corsOptions));

// app.use(function (req, res, next) {
  // console.log("********",res.body);
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });


//routes
app.use("/api",authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);
app.use("/api", paymentBRoutes);


//PORT

const port = process.env.PORT || 8000;

//Starting the server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});