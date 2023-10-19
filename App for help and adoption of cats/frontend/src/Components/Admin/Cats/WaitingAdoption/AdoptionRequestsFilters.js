import classes from "./AdoptionRequestsFilters.module.css";

const AdoptionRequestsFilters = (props) => {
  return (
    <div className={classes.adoption_requests_filters}>
      <button
        className={props.status === "pending" ? classes.active : ""}
        onClick={() => props.onStatusChangeHandler("pending")}
      >
        Pending
      </button>
      <button
        className={props.status === "read" ? classes.active : ""}
        onClick={() => props.onStatusChangeHandler("read")}
      >
        Read
      </button>
      <button
        className={props.status === "all" ? classes.active : ""}
        onClick={() => props.onStatusChangeHandler("all")}
      >
        ALL
      </button>
    </div>
  );
};

export default AdoptionRequestsFilters;
