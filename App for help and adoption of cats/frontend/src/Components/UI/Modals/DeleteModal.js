import Backdrop from "./Backdrop/Backdrop";
import ReactDOM from "react-dom";
import ModalOverlay from "./ModalOverlay/ModalOverlay";

const DeleteModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop cancelConfirmDeleteModal={props.cancelConfirmDeleteModal}/>,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay cancelConfirmDeleteModal={props.cancelConfirmDeleteModal} onDeleteHandler={props.onDeleteHandler}/>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default DeleteModal;
