const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res)=>{
    try{
        const email = req.user;
        const user = await pool.query("SELECT user_name,user_email FROM users WHERE user_email = $1", [email]);

        res.status(200).json({'error':false,'data':user.rows[0]});
    } catch(err) {
        console.log(err.message);
        res.status(500).json({'error':true, "message":err.message})
    }
})





module.exports = router;