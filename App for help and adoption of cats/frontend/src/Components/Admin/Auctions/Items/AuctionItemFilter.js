import classes from './AuctionItemFilter.module.css';

const AuctionItemFilter = (props) => {
  return (
    <div className={classes.auction_item_filters}>
      <button
        className={props.filter === "all" ? classes.active : ""}
        onClick={() => props.onFilterChangeHandler("all")}
      >
        ALL
      </button>
      <button
        className={props.filter === "active" ? classes.active : ""}
        onClick={() => props.onFilterChangeHandler("active")}
      >
        Active
      </button>
      <button
        className={props.filter === "inactive" ? classes.active : ""}
        onClick={() => props.onFilterChangeHandler("inactive")}
      >
        Inactive
      </button>
    </div>
  )
}

export default AuctionItemFilter