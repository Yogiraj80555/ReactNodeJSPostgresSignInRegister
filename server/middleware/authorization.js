const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
    try{
        const jwtToken = req.header("token");

        if (!jwtToken) {
            console.error("Jwt Token empty");
            return res.status(403).json({"error":true, "message":"user not authorized"})       
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret)
        req.user = payload.user
    } catch(err) {
        console.error(err.message);
        return res.status(403).json({"error":true, "message":"user not authorized"})
    }
}