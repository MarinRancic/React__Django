import {useNavigate} from "react-router-dom";
import classes from "./ChangeCarouselInfoButton.module.css";

const ChangeCarouselInfoButton = () => {

    const navigate = useNavigate();

    const onChangeInfo = () => {
        return navigate("/carouselDetails");
    }

    return(
        <div className={classes.change_carousel_info}>
            <button onClick={onChangeInfo}>Change Info</button>
        </div>
    )
}

export default ChangeCarouselInfoButton;