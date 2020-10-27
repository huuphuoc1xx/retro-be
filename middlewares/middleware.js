
const boardRoute = require("../routes/board.route");


module.exports = (app) => {
    app.use((req,res,next)=>{
        req.session.userId=1;
        next();
    })
    app.use("/board", boardRoute);
}