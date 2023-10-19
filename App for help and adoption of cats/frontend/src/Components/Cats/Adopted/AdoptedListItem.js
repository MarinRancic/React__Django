import { useNavigate } from "react-router-dom";
import classes from "./AdoptedListItem.module.css";

const AdoptedListItem = (props) => {

  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`${props.id}`);
  };

  return (
    <div className={classes.adopted_list_item}>
      <div className={classes.adopted_list_item__name}>{props.name}</div>
      <div className={classes.adopted_list_item__picture}>
        <img
          onClick={onClickHandler}
          src={"http://127.0.0.1:8000/api" + props.picture}
          alt="Error"
        />
      </div>
    </div>
  );
};
export default AdoptedListItem;
