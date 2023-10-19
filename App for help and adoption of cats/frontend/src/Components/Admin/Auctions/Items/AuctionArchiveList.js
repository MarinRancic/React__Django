import classes from "./AuctionArchiveList.module.css";
import AuctionArchiveItemList from "./AuctionArchiveItemList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const AuctionArchiveList = (props) => {
  return (
    <div className={classes.auction_archive_list}>
      {props.currentPage !== 1 ? (
        <div className={classes.auction_archive_list__arrow_left}>
          <div className={classes.auction_archive_list__arrow_left__button}>
            <FontAwesomeIcon
              onClick={props.onPageDecreaseHandler}
              icon={faChevronLeft}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {props.items?.map((index) => (
        <AuctionArchiveItemList
          key={index.id}
          id={index.id}
          name={index.name}
          picture={index.picture}
          startingPrice={index.starting_price}
          minimumBid={index.minimum_bid}
          bidHolder={index.bid_holder}
          bidHolderUsername={index.bid_holder_username}
          getAllItems={props.getAllItems}
        />
      ))}
      {props.currentPage < Math.ceil(props.itemCount / 3) ? (
        <div className={classes.auction_archive_list__arrow_right}>
          {" "}
          <div className={classes.auction_archive_list__arrow_right__button}>
            <FontAwesomeIcon
              onClick={props.onPageIncreaseHandler}
              icon={faChevronRight}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AuctionArchiveList;
