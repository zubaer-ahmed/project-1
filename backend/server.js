var exceptionHandler = require("express-exception-handler");
exceptionHandler.handle();
const path = require("path");
const express = require("express");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// Local Modules
const userRoute = require("./routes/userRoute.js");
const jobRoute = require("./routes/jobRoute.js");
const servicesRoute = require("./routes/serviceRoute.js");
const commentRoute = require("./routes/commentRoute.js");
const workerRoute = require("./routes/workerRoute.js");
const ordersRoute = require("./routes/orderRoute.js");
const chatRoute = require("./routes/chatRoute.js");
const models = require("./models");
const jwt = require("jsonwebtoken");

const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
require("./handleSocketIO.js").handleSocketIO(io);
// Server Initialization
const PORT = 8001;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ], // 5173 is the vite dev server port
    credentials: true,
  })
);

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes will be written here
app.use("/api/users", userRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/services", servicesRoute);
app.use("/api/comments", commentRoute);
app.use("/api/workers", workerRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/chats", chatRoute);
app.get("/api/getObjectId", (req, res) =>
  res.send(new models.mongoose.Types.ObjectId().toString())
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err?.message); // Log the error for debugging purposes
  console.error(err?.stack); // Log the error for debugging purposes
  // Set an appropriate status code based on the error type
  const statusCode = err.statusCode || 500;
  // Send an error response to the client
  res.status(statusCode).json({ error: err.message });
});

app.use(express.static(path.join(__dirname, "dist")));

// Serve 'index.html' for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Server Listen Along with Database
server.listen(PORT, "0.0.0.0", (error) => {
  if (!error) console.log("Listening on http://localhost:" + PORT);
  else console.log("Error occurred, server can't start", error);
});
const resolvers = {};
