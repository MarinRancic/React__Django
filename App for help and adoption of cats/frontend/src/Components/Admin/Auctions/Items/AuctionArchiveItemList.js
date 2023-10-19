import classes from "./AuctionArchiveItemList.module.css";

const AuctionArchiveItemList = (props) => {

  return (
    <div className={classes.auction_archive_items}>
      <div className={classes.auction_archive_items__name}>{props.name}</div>
      <div className={classes.auction_archive_items__picture}>
        {props.picture ? (
          <img src={"http://127.0.0.1:8000/api" + props.picture} />
        ) : (
          <p>No image to display</p>
        )}
      </div>
      <div className={classes.auction_archive_items__prices}>
        <div>
          <label htmlFor="current_price">Price:</label>
          <span>{props.startingPrice}&euro;</span>
        </div>
      </div>
      <div className={classes.auction_archive_items__bid_holder}>
        <label htmlFor="bid_holder">Winning Bidder:</label>
        {props.bidHolderUsername ? (
          <span>{props.bidHolderUsername}</span>
        ) : (
          <span id={classes.no_bids}>No bidders</span>
        )}
      </div>
    </div>
  );
};

export default AuctionArchiveItemList;
