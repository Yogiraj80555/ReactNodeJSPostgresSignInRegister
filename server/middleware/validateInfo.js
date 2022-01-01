module.exports = (req,res,next) => {
    const { email, name, password } = req.body;
    
    function validateEmail(email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }


    if (req.path === "/register") {
        if (![email, name, password].every(Boolean)) {
            console.log("Credential missing")
            return res.status(401).json({'error':true,"message":"Credential missing"})
        } else if (!validateEmail(email)){
            console.log("Email Validation failed")
            return res.status(401).json({'error':true,"message":"email validation failed"})
        }
    } else if (req.path === "/login"){
        if (![email, password].every(Boolean)) {
            console.log("Credential missing")
            return res.status(401).json({'error':true,"message":"Missing Credential"})
        } else if (!validateEmail(email)){
            console.log("Email Validation failed")
            return res.status(401).json({'error':true,"message":"email validation failed"})
        }
    }
    next();
};