const express = require("express");
const app = express();
const cors = require('cors')
require('dotenv').config()
const port=process.env.PORT


const bodyParser = require('body-parser')
require('./database/db');


// Import routes
const commonRoutes = require("./routes/commonroute");

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(express.json());

// route Middlewares
app.use("/", commonRoutes);

app.listen(port, () => console.log(`server up and runing on port ${port}` ));
