import classes from "./Backdrop.module.css";

const Backdrop = (props) => {
  const onClickHandler = () => {
    props.cancelConfirmDeleteModal();
  };

  return <div className={classes.backdrop} onClick={onClickHandler} />;
};

export default Backdrop;
