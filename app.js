require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const postData = require("./data/postData");
const Post = require("./models/post");
const methodOverride = require("method-override");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();

// importing all the routes
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const homeRoute = require("./routes/home");
const filterRoute = require("./routes/filter");
const addPostRoute = require("./routes/addPost");
const searchRoute = require("./routes/search");
const newFormRoute = require("./routes/newForm");
const editPostRoute = require("./routes/editPost");
const deletePostRoute = require("./routes/deletePost");
const requireAuth = require("./middlewares/requireAuth");
const logOutRoute = require("./routes/logout");

const PORT = process.env.PORT || 3000;

// Middleware configuration
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" }));
app.use(compression());
// app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "img-src": ["'self'", "data:", "https:"],
      },
    },
  })
);
app.use(morgan("combined"));

// Database Initialization
const MONGODB = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Blogpost";
mongoose
  .connect(MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,  
  socketTimeoutMS: 45000         
})
  .then(() => console.log("Connection Successful"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if the connection fails
  });

// const initDB = async () => {
//   try {
//     const postCount = await Post.countDocuments();
//     if (postCount === 0) {
//       await Post.insertMany(postData);
//       console.log("Initial data seeded.");
//     }
//   } catch (error) {
//     console.error("Error during database initialization:", error.message);
//   }
// };

// initDB();

// Using all the imported routes
app.use("/", registerRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/posts", requireAuth, homeRoute);
app.use("/filter", requireAuth, filterRoute);
app.use("/posts", requireAuth, addPostRoute);
app.use("/search", requireAuth, searchRoute);
app.use("/new", requireAuth, newFormRoute);
app.use("/posts", requireAuth, editPostRoute);
app.use("/posts", requireAuth, deletePostRoute);
app.use("/logout", requireAuth, logOutRoute);

// Server is active
app.listen(PORT, () => console.log(`Server is active on ${PORT}`));
