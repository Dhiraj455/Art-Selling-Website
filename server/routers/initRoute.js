const express = require('express');

const initRoute = (app) =>{
    app.use(require("./authRouter"))
    app.use(require("./userRouter"))
    app.use(require("./postRouter"))
}

module.exports = initRoute;