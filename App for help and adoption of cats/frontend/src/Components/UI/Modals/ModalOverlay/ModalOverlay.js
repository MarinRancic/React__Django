import classes from "./ModalOverlay.module.css";

const ModalOverlay = (props) => {
  const onCancelHandler = () => {
    props.cancelConfirmDeleteModal();
  };

  const onDeleteHandler = () => {
    props.onDeleteHandler();
  };

  return (
    <div className={classes.modal_overlay}>
      <h3>Are you sure you want to delete this?</h3>
      <div className={classes.modal_overlay__buttons}>
        <button
          onClick={onDeleteHandler}
          className={classes.modal_overlay__buttons__confirm}
        >
          YES
        </button>
        <button
          onClick={onCancelHandler}
          className={classes.modal_overlay__buttons__cancel}
        >
          NO
        </button>
      </div>
    </div>
  );
};

export default ModalOverlay;
