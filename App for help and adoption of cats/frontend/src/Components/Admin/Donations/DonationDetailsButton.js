import classes from "./DonationDetailsButton.module.css";
import { useNavigate } from "react-router-dom";

const DonationDetailsButton = () => {
  const navigate = useNavigate();

  const onChangeInfo = () => {
    return navigate("/donationDetails");
  };

  return (
    <div className={classes.donation_details_button}>
      <button onClick={onChangeInfo}>Change Info</button>
    </div>
  );
};

export default DonationDetailsButton;
