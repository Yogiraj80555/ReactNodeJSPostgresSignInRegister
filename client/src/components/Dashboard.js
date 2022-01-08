import React, {Fragment, useState, useEffect} from "react";

const Dashboard = ({setAuth}) => {

    const [name, setName] = useState("");

    useEffect(() => {
        getName(); 
    },[]);//this for only single request

    async function getName() {
        try{
            const response = await fetch("http://192.168.0.100:5000/dashboard",{
                method: "GET",
                headers: {
                    token: localStorage.token
                }
            });
            
            const parseRes = await response.json();
            console.log(parseRes);
            if(name === "") {
                setName(parseRes.data.user_name)
            }
            
        }catch(err){
            console.error("getname: "+err.message);
        }
    }

    const logout = e => {
        e.preventDefault();
        //localStorage.removeItem("token")
        //localStorage.removeItem("key")
        setName("")
        setAuth(false)
        console.log("logingout");
    }

    return (
        <Fragment>
            <h1 className="text-center">Dashboard</h1>
            <h3 className="text-center">{name}</h3>
            <button className="btn-success btn btn-block" onClick={e => logout(e)}>Logout</button>
        </Fragment>
    );
};

export default Dashboard;