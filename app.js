const express = require('express')
const cookieParser = require("cookie-parser")
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cookieParser())

console.log(process.env.FRONTEND_URL)
app.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["POST"],
      credentials: true,
    })
  );

app.use(express.urlencoded({ extended: true }));

const user = require('./routes/userroutes')

app.use("/api/v1", user)




module.exports = app