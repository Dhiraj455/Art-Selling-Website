const express = require('express');

const initRoute = (app) =>{
    app.use(require("./authRouter"))
    app.use(require("./userRouter"))
    app.use(require("./postRouter"))
    app.use(require("./buyRouter"))
}

module.exports = initRoute;