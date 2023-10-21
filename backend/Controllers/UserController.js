const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

// const Users = require("../Database/Users.json");
const User = require("../Modals/User");

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    if (!username || !email || !password) {
        return res.send('Bad request. Need all fields.')
    }

    // if (Users.find(user => user.email === email)) {
    //     return res.send('User already exists. Cannot create user with same credentials.')
    // }

    const duplicateUser = await User.findOne({username});
    console.log('duplicateUser', duplicateUser);
    if (duplicateUser) {
        return res.send('User already exists. Cannot create user with same credentials.')
    }

    // const user = {
    //     name: username,
    //     email,
    //     password
    // };
    // Users.push(user);
    // fs.writeFile("./backend/Database/Users.json", JSON.stringify(Users), function(err){
    //     if (err) {
    //         throw err;
    //     }
    // })

    const user = await User.create({
        username,
        email,
        password
    })

    res.send({
        message: 'User created successfully!',
        user
    });
}

exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.send('Bad request. Need all fields.')
    }

    const currentUser = Users.find(user => user.email === email);
    if (!currentUser) {
        return res.send('No user exist with the entered email id.')
    }

    if (currentUser.password !== password) {
        return res.send('Incorrect password')
    }
    // udayAtlas
    // Atlas@121
    const user = {
        name: currentUser.name,
        email: currentUser.email
    }
    // Storing user data in session
    // req.session.isLoggedIn = true,
    // req.session.user = user
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '15m' })

    Users.forEach((user) => {
        if (user.email === currentUser.email) {
            user.refreshToken = refreshToken;
        }
    })

    const filePath = path.join(__dirname, '../Database/Users.json')
    fs.writeFile(filePath, JSON.stringify(Users), (err => {
        if (err) {
            throw err;
        }
    }))

    res.cookie('refresh_jwt', refreshToken, { httpOnly: true })
    res.send({
        message: 'Login successful!',
        accessToken,
        refreshToken
    })
}

exports.getDashboard = (req, res) => {
    // --------------------------------------------------------
    // Authorization using Session
    // --------------------------------------------------------
    // const { user } = req.session;
    // if (user && user.name) {
    //     return res.send('Welcome to dashboard!');
    // } else {
    //     return res.send('Please login to proceed');
    // }
    // --------------------------------------------------------

    res.send('Welcome to dashboard ')
}

exports.logout = (req, res) => {
    const cookies = req.cookies;
    if (!(cookies && cookies.refresh_jwt)) { return res.sendStatus(204) }

    const refresh_jwt = cookies.refresh_jwt;
    const currentUser = Users.find(user => user.refreshToken === refresh_jwt);
    if (!currentUser) {
        res.clearCookie('refresh_jwt', { httpOnly: true });
        return res.sendStatus(204);
    }

    Users.forEach(user => {
        if (user.refreshToken === refresh_jwt) {
            user.refreshToken = '';
        }
    })

    const filePath = path.join(__dirname, '../Database/Users.json');
    fs.promises.writeFile(filePath, JSON.stringify(Users));

    res.clearCookie('refresh_jwt', { httpOnly: true });
    res.status(200).send('Logged out successfully!');
}
