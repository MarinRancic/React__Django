import classes from "./WaitingAdoptionListItem.module.css";
import { useNavigate } from "react-router-dom";

const WaitingAdoptionListItem = (props) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`${props.id}`);
  };

  return (
    <div className={classes.waiting_adoption_list_item}>
      <div className={classes.waiting_adoption_list_item__name}>
        {props.name}
      </div>
      <div className={classes.waiting_adoption_list_item__picture}>
        <img
          onClick={onClickHandler}
          src={"http://127.0.0.1:8000/api" + props.picture}
          alt="Error"
        />
      </div>
    </div>
  );
};

export default WaitingAdoptionListItem;
