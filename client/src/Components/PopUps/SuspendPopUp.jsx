import React from "react";
import "../../Assets/css/modal.css";
import { toast } from "react-toastify";
import { suspend } from "../../Services/Admin";

const SuspendPopUp = ({ setShowModal, userName, userId }) => {
  const handleDelete = () => {
    suspend({ id: userId }).then((data) => {
      toast.warn(data.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setShowModal(false);
    });
  };

  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h6 className="text-center text-light">Suspend user</h6>
        <div className="input__item mb-3">
          <h6>Do You Want To Suspend User {userName} ?</h6>
        </div>
        <div className=" mt-3 d-flex align-items-center justify-content-between">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={handleDelete}
          >
            <i className="ri-delete-bin-6-line"></i> Suspend
          </button>

          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={() => setShowModal(false)}
          >
            <i className="ri-close-line"></i> Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuspendPopUp;
