const express = require('express');
const app = express();
const cors = require("cors");
const PORT = 5000


//mideleware
app.use(express.json()); //req.body
app.use(cors());


//Routes
//register an login
app.use("/auth",require("./routes/jwtAuth"));


app.listen(PORT , ()=>{
    console.log("server running on port "+PORT);
});
