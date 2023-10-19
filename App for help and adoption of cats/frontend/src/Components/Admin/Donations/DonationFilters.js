import classes from "./DonationFilters.module.css";

const DonationFilters = (props) => {
  return (
    <div className={classes.donation_filters}>
      <button
        className={props.donors === "all" ? classes.active : ""}
        onClick={() => props.onDonorsChangeHandler("all")}
      >
        ALL
      </button>
      <button
        className={props.donors === "top" ? classes.active : ""}
        onClick={() => props.onDonorsChangeHandler("top")}
      >
        Top Donors
      </button>
      <button
        className={props.donors === "statistics" ? classes.active : ""}
        onClick={() => props.onDonorsChangeHandler("statistics")}
      >
        Statistics
      </button>
    </div>
  );
};

export default DonationFilters;
