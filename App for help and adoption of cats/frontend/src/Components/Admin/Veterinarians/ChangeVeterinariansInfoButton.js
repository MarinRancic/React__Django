import {useNavigate} from "react-router-dom";
import classes from "./ChangeVeterinariansInfoButton.module.css";

const ChangeVeterinariansInfoButton = () => {

    const navigate = useNavigate();

    const onChangeInfo = () => {
        return navigate("/veterinariansDetails");
    }

    return(
        <div className={classes.change_veterinarians_info_button}>
            <button onClick={onChangeInfo}>Change Info</button>
        </div>
    )
}

export default ChangeVeterinariansInfoButton;