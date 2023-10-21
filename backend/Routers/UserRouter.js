// import express from "express";
// import fetch from 'node-fetch';
// import { getPosts } from "../Controllers/PostsController.js";
// import { register } from "../Controllers/UserController.js";


const express = require("express");
// const fetch = require('node-fetch');
// const { getPosts } = require("../Controllers/PostsController.js");
const {
    register,
    login,
    getDashboard,
    logout
} = require("../Controllers/UserController.js");
const { verifyJWT } = require("../Middlewares/authMiddleware")

const router = express.Router();

// router.get('/todos', (req, res) => {
//     fetch('https://jsonplaceholder.typicode.com/todos')
//         .then(response => response.json())
//         .then(json => res.send(json))
// })

// router.get('/posts', getPosts);
router.post('/register', register);
router.post('/login', login);
router.get('/dashboard', verifyJWT, getDashboard);
router.get('/logout', logout);


module.exports = router;
