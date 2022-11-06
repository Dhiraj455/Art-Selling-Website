import React from "react";
import "../../Assets/css/modal.css";
import { toast } from "react-toastify";
import { deletePost } from "../../Services/User";

const DeletePopUp = ({ setShowModal, postName, id, userId }) => {
  const handleDelete = () => {
    deletePost({
      id: id,
      userId: userId,
    }).then((data) => {
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
          <i class="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h6 className="text-center text-light">Delete Post</h6>
        <div className="input__item mb-3">
          <h6>Do You Want To Delete This Post {postName} ?</h6>
        </div>
        <div className=" mt-3 d-flex align-items-center justify-content-between">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={handleDelete}
          >
            <i class="ri-delete-bin-6-line"></i> Delete
          </button>

          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={() => setShowModal(false)}
          >
            <i class="ri-close-line"></i> Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;
