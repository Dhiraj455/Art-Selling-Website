const express = require('express');
require('./config/db');
const app = express();
const user = require('./models/user');
const cookieParser = require('cookie-parser')
const initRoute = require('./routers/initRoute');
const multer = require('multer');
// const cors = require('cors');

// app.use(cors);
app.use(cookieParser())

const upload = multer({
    destination: 'Public/',
});

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

initRoute(app);

app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT);
});

module.exports = app;


