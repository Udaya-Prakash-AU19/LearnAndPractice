const jwt = require("jsonwebtoken");
const Users = require("../Database/Users.json");

exports.verifyRefreshToken = (req, res) => {
    const cookies = req.cookies;
    // Initiate authentication using refresh token by checking if the cookies have refresh token
    if (!(cookies && cookies.refresh_jwt)) { return res.sendStatus(401) }

    // check if the user trying to access the route is present in the database
    const refresh_jwt = cookies.refresh_jwt;
    const currentUser = Users.find(user => user.refreshToken === refresh_jwt);
    if (!currentUser) { return res.status(401).send('No user found with the provided refresh token') }
    
    // verify refresh token sent by client to get correct user details
    jwt.verify(refresh_jwt, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        console.log('decoded refresh token', decoded);
        if (err || currentUser.name !== decoded.name) {
            return res.status(401).send('Invalid Refresh Token')
        }
    })

    // create new access token
    const accessToken = jwt.sign(
        {
            name: currentUser.name,
            email: currentUser.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s'}
    )

    res.send({ accessToken })
}