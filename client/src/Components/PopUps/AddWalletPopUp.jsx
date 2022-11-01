import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Autho from "../../Helpers/AuthHelp";
import { addWallet } from "../../Services/User";
import "../../Assets/css/modal.css";
// import "./modal.css"

const AddWalletPopUp = ({ setShowModal }) => {
  const navigate = useNavigate();
  const [x, setX] = useState([]);
  const [amount, setAmount] = useState(0);
  const callAbout = async () => {
    try {
      const data = await Autho();
      setX(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAbout();
  }, []);

  const handleBtn = (e) => {
    e.preventDefault();
    if (amount === 0) {
      alert("please enter amount");
    } else {
      var options = {
        key: "rzp_test_tupa66FxDzP1Ys",
        key_secret: "9ieux6YxadTdX3qRIHnY4F2U",
        amount: amount * 100,
        currency: "INR",
        name: "METART",
        description: "for testing purpose",
        handler: function (response) {
          console.log(response);
          try {
            addWallet({ id: x._id, wallet: amount }).then((data) => {
              alert(data.data.message);
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
        <span className="close__modal">
          <i class="ri-close-line" onClick={() => setShowModal(false)}></i>
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

        {/* <div className="input__item mb-4">
          <input type="number" placeholder="Enter Amount" />
        </div> */}

        <button className="place__bid-btn" onClick={handleBtn}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddWalletPopUp;
