import classes from "./ChangeAdoptedButton.module.css";
import { useNavigate } from "react-router-dom";

const ChangeAdoptedButton = () => {
  const navigate = useNavigate();

  const onChangeInfo = () => {
    return navigate("/adoptedDetails");
  };

  return (
    <div className={classes.change_adopted_button}>
      <button onClick={onChangeInfo}>Change Info</button>
    </div>
  );
};

export default ChangeAdoptedButton;
