import classes from "./WaitingAdoptionRequestsButton.module.css";
import { useNavigate } from "react-router-dom";

const WaitingAdoptionRequestsButton = () => {
  const navigate = useNavigate();

  const onChangeInfo = () => {
    return navigate("requests");
  };

  return (
    <div className={classes.adoption_request_button}>
      <button onClick={onChangeInfo}>REQUESTS</button>
    </div>
  );
};

export default WaitingAdoptionRequestsButton;
