const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtGenerator(user_id){
    const payload = {
        user: user_id
    }
    const env = process.env.jwtSecret;
    const token = jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1hr", algorithm:"HS512"}); // instead of "1hr" we can use 60*60
    return token;
}

module.exports = jwtGenerator;