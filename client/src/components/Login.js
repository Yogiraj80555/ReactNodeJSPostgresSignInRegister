import React, {Fragment, useState} from "react";

const Login = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email:"",
        password:""
    });

    const {email,password} = inputs;

    const onChange = e => {
        setInputs({...inputs, [e.target.name]:e.target.value})
    }

    const onSubmitFrom = async(e) => {
        e.preventDefault()
        try{
            const body = {email,password}
            const response = await fetch("http://192.168.0.100:5000/auth/login", {
                method : "POST",
                headers :  {"content-Type":"application/json"},
                body:JSON.stringify(body)
            });

            const parseRes = await response.json()
            if(parseRes.error){
                console.log(parseRes.message);
            }
            console.log(parseRes)

            localStorage.setItem("token",parseRes.cache) 
            localStorage.setItem("key",parseRes.key)
            setAuth(true)
        }catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center my-5"><i>Login</i></h1>
            <form onSubmit={onSubmitFrom}>
                <input type="email" name="email" placeholder="email" className="form-control my-4" value={email} onChange={e=>onChange(e)}/>
                <input type="password" name="password" placeholder="password" className="form-control my-4" value={password} onChange={e => onChange(e)}/>
                <button className="btn btn-success btn-block">Login</button>
            </form>
        </Fragment>
    );
};

export default Login;