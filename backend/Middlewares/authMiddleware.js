const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyJWT = (req, res, next) => {
    let token;
    const authorization = req.headers.authorization;
    console.log('authorization', authorization);
    if (authorization) {
        try {
            token = authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.username = user.username;
            next();
        } catch(err) {
            // res.status(401);
            // throw new Error("You are not authorized")
            //          or
            res.status(401).send("You are not authorized");
        }
    } else {
        res.status(401).send("You are not authorized");
        // throw new Error("You are not authorized")
    };
}
