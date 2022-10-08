const express = require('express');
require('./config/db');
const app = express();
const cookieParser = require('cookie-parser')
const initRoute = require('./routers/initRoute');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const cors = require('cors');

app.use(cors());
app.use(cookieParser())

const upload = multer({
    destination: 'public/images',
});
app.use(express.static(path.join(__dirname, 'public')));

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

initRoute(app);

app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT);
});

module.exports = app;


