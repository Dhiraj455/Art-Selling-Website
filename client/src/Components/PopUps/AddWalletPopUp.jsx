import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Autho from "../../Helpers/AuthHelp";
import { addWallet } from "../../Services/User";
import "../../Assets/css/modal.css";
import { toast } from "react-toastify";
import payment from "../../Assets/images/image3.png"

const AddWalletPopUp = ({ setShowModal }) => {
  const navigate = useNavigate();
  const [x, setX] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    try {
      Autho().then((data) => {
        setX(data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleBtn = (e) => {
    e.preventDefault();
    if (amount === 0) {
      toast.warn("Please Enter A Valid Amount", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      var options = {
        key: "rzp_test_tupa66FxDzP1Ys",
        key_secret: "9ieux6YxadTdX3qRIHnY4F2U",
        amount: amount * 100,
        currency: "INR",
        name: "METART",
        description: "for testing purpose",
        handler: function (response) {
          try {
            addWallet({ id: x._id, wallet: amount }).then((data) => {
              toast.success(data.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
              navigate("/profile");
              setShowModal(false);
            });
          } catch (err) {
            console.log(err);
          }
        },
        prefill: {
          name: "Dhiraj Shelke",
          email: "dhirajshelke16@gmail.com",
          contact: "93263731930",
        },
        notes: {
          address: "Razorpay Corporate office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var pay = new window.Razorpay(options);
      pay.open();
    }
  };
  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <img className="creditcard" src={payment} alt="" />
        <span className="close__modal">
          <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h6 className="text-center text-light">Add To Wallet</h6>

        <div className="input__item mb-4">
          <input
            type="number"
            placeholder="Enter Amount"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>

        <button className="place__bid-btn" onClick={handleBtn}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddWalletPopUp;
