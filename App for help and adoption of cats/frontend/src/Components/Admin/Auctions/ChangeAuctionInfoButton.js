import {useNavigate} from "react-router-dom";
import classes from "./ChangeAuctionInfoButton.module.css";

const ChangeAuctionInfoButton = () => {

    const navigate = useNavigate();

    const onChangeInfo = () => {
        return navigate("/auctionDetails");
    }

    return(
        <div className={classes.change_auction_info}>
            <button onClick={onChangeInfo}>Change Info</button>
        </div>
    )
}

export default ChangeAuctionInfoButton;