
import React from "react";
import { useEffect } from "react";


function Logout(){
    try{
    useEffect(()=>{
        fetch("/logout",{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then(res=>{
            console.log(res);
            window.location.href="/login";
            if(res.status===200){
                console.log("Logout Successful");
            }
        }).catch(err=>{
            console.log(err);
        })
    } ,[]);
    }catch(err){
        console.log(err);
    }

  return (
    <div>
      <h1>Logout</h1>
    </div>
  );
}

export default Logout;