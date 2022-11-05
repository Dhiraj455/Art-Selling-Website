const express = require('express');

const initRoute = (app) =>{
    app.use(require("./authRouter"))
    app.use(require("./userRouter"))
    app.use(require("./postRouter"))
    app.use(require("./buyRouter"))
    app.use(require("./adminRouter"))
}

module.exports = initRoute;