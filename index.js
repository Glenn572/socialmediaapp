const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/Users");
const authRoute = require("./routes/Auth");
const postRoute = require("./routes/Post");
const conversationRoute = require("./routes/Conversation");
const messageRoute = require("./routes/Message");
const multer = require("multer");
const path=require('path')

dotenv.config();
mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("connected to database");
});

app.use(
  cors({
    origin: "*",
    method: ["GET", "POST", "PUT", "DELETE"],
  
  })
);

app.use('/images',express.static(path.join(__dirname,'public/images')))

//Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);


//multer for file handling , photo uploading from client server and receiving at server side
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage }); // destination path
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("file has been uploaded successfully");
  } catch (error) {
    console.log("Error while photo uploading", error);
  }
});

app.get("/", (req, res) => {
  res.send("welcome to homepage");
});
app.get("/users", (req, res) => {
  res.send("welcome to users homepage");
});

app.listen(8800, () => {
  console.log("Server is running...");
});
