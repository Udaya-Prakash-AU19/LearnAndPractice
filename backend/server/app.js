const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const { connectDB } = require("../Config/dbConn");
const userRouter = require('../Routers/UserRouter.js');
const refreshRouter = require('../Routers/RefreshRouter.js');

const app = express()
const port = process.env.PORT || 3001;

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(cookieParser());
// On using this session here, creates a session in the application. The req will have session and sessionID if a session is created.
// app.use(session({
//     secret: 'I_AM_WINNING',
//     resave: false,
    // It is meaningful for the session to create cookies if the session object is modified during login
    // such as assinging user's details to session object for future reference to the user loggedin.
    // So if 'saveUninitialized = true', even if the user has not loggedin and try to access any route,
    // cookies will be created unnecessarily as it has no information about the user yet.
    // By default 'saveUninitialized' is 'true', so should be made of 'false'
//     saveUninitialized: false,
//     cookie: { maxAge: 5000 }
// }))
app.use(cors());
app.use('/api/v1', userRouter);
app.use('/api/v1', refreshRouter);

mongoose.connection.once('open', () => {
    console.log('Mongodb connected sucessfully..!')
    app.listen(port, () => console.log('Server started successfully at port ' + port))
});
