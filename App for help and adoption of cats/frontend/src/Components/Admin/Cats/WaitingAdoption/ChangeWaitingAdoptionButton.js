import classes from "./ChangeWaitingAdoptionButton.module.css";
import { useNavigate } from "react-router-dom";

const ChangeWaitingAdoptionButton = () => {
  const navigate = useNavigate();

  const onChangeInfo = () => {
    return navigate("/waitingAdoptionDetails");
  };

  return (
    <div className={classes.change_waiting_adoption_button}>
      <button onClick={onChangeInfo}>Change Info</button>
    </div>
  );
};

export default ChangeWaitingAdoptionButton;
