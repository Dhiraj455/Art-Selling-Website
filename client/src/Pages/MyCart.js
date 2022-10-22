import React, { useState, useEffect } from "react";
import Autho from "../Helpers/AuthHelp";
import {mycart} from "../Services/Buy"

function MyCart(){
    const [data,setData] = useState([]);
    const [total,setTotal] = useState();
    const User = async () => {
        try{
            let user = await Autho();
            console.log(user._id);
            mycart(user._id).then((data)=>{
                console.log(data);
                setData(data.data.result);
                setTotal(data.data.total);
            })
            .catch((err)=>{
                console.log("Error" + err)
            })
            console.log(data);
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        User();
    },[]);

    const handleBtn = () => {

    }
    return (
        <>
        <div className="container">
        {data.map((products,key)=>(
            <div className="card">
            <img
              src={products.postImage}
              className="photo card-img-top"
              alt="Some"
            />
            {/* <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </p>
            </div> */}
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                {products.title}
              </li>
              <li className="list-group-item">{products.price}</li>
              {/* <li className="list-group-item">{products.description}</li> */}
              <li className="list-group-item">{products.count}</li>
            </ul>
            <button onClick={handleBtn}>Delete</button>
          </div>
        ))}
        </div>
        <h1>Total {total}</h1>
        </>
    )
}

export default MyCart;