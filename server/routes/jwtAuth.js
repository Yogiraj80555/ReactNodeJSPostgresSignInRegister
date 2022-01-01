const pool = require("../db");
const bcrypt = require('bcrypt');
const router = require("express").Router();
const jwtGenerator = require("../utils/jwtGenerator");
const validation = require("../middleware/validateInfo")
const authorized = require("../middleware/authorization")
//registering
router.post("/register", validation,async(req, res) => {
    try{

        // 1. Destructure the req.body and get name, email, pass

        const {name, email, password} = req.body;

        // 2. check if user alreadu exist (if exist throw error) 
        const user = await pool.query("SELECT * from users WHERE user_email  = $1", [email]);

        if(user.rows.length !== 0 ){
            //Http status code 403 for already exists, indicate that it is not possible to create new because another already exists.
            return res.status(403).json({'error': true, 'message': 'user already exists' });
        }

        // 3. Bcrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        //this give us incrypted password
        const bcryptPass = await bcrypt.hash(password,salt);

        // 4. enter the new user inside our database
        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password ) values($1,$2,$3) RETURNING *",[name, email, bcryptPass])

        // 5. generating our jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);

        res.status(200).json({'error':false,"cache":token})
        // 204 indicate request is successfull but there is noting to return.
        //res.status(203).json({"error":false})
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");

    }
});



//login route
router.post("/login", validation, async (req,res) => {
    try{
        //1. destructure the req.body

        const {email, password } = req.body;

        //2. check if user doesn't exists (if not then we throw error)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[email]);
        if (user.rows.length === 0) {
            return res.status(401).json({'error':true,"message":"user and password not found"})
        }
        //3. check if incomming password is the same the database password
        const validPass = await bcrypt.compare(password,user.rows[0].user_password);
        if(!validPass){
            return res.status(200).json({"message":"Invalid user name or password", "error":true});
        }
        
        //4. give them the jwt token
        const token = jwtGenerator(user.rows[0].user_email)
        res.status(200).json({'error':false,"cache":token});
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


//verify JWT
router.post("/is-verify", authorized,async(req,res) => {
    try{
        res.json({'error':false,"verification":true});
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});


//exporting module
module.exports = router;