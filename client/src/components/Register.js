import React, {Fragment, useState} from "react";

const Register = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        email:"",
        password:"",
        name:""
    })

    const {email, password, name} = inputs;

    const onChange = e => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const onSubmitFrom = async e => {
        e.preventDefault(); //preventing refresh page

        try{

            const body = {email,password,name}
            const response = await fetch("http://192.168.0.100:5000/auth/register", {
                method:"POST",
                headers: {"content-Type":"application/json"},
                body:JSON.stringify(body)
            });
            
            
            const parseRes = await response.json();
            
            if (parseRes.error){
                console.log(parseRes.message);
            }
            console.log(parseRes.cache);
            localStorage.setItem("token",parseRes.cache)
            localStorage.setItem("key",parseRes.key)
            setAuth(true)
        }catch(err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitFrom}>
                <input type="email" name="email" placeholder="email" className="form-control my-3" value={email} onChange={e => onChange(e)}/>
                <input type="password" name="password" placeholder="password" className="form-control my-3" value={password} onChange={e => onChange(e)}/>
                <input type="name" name="name" placeholder="name" className="form-control my-3" value={name} onChange={e => onChange(e)}/>
                <button className="btn btn-block btn-success">Register</button>
            </form>
        </Fragment>
    );
};

export default Register;