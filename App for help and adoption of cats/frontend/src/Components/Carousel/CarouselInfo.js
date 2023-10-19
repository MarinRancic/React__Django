import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import classes from "./CarouselInfo.module.css";
import { Link, useNavigate } from "react-router-dom";

const CarouselInfo = (props) => {
  const navigate = useNavigate();

  const redirectHandler = () => {
    const url = new URL(props.data.link_url)
    navigate(url.pathname);
  };

  return (
    <div className={`${props.data.is_link ? classes.text__link : classes.text}`} onClick={redirectHandler}>
      {props.data.is_link ? (
        <FontAwesomeIcon icon={faLink} className={classes.linkIcon} />
      ) : (
        ""
      )}
      {props.data.text}
    </div>
  );
};

export default CarouselInfo;
