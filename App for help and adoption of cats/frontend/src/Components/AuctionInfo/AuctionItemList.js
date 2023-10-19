import classes from "./AuctionItemList.module.css";
import AuctionItem from "./AuctionItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const AuctionItemList = (props) => {
  return (
    <div className={classes.list}>
      {props.currentPage !== 1 ? (
        <div className={classes.list__arrow_left}>
          <div className={classes.list__arrow_left__button}>
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
        <AuctionItem
          key={index.id}
          id={index.id}
          name={index.name}
          picture={index.picture}
          startingPrice={index.starting_price}
          minimumBid={index.minimum_bid}
          bidHolder={index.bid_holder}
          bidHolderUsername = {index.bid_holder_username}
          bidHolderVerified = {index.bid_holder_verified}
          getAllItems={props.getAllItems}
        />
      ))}
      {props.currentPage < Math.ceil(props.itemCount / 3) ? (
        <div className={classes.list__arrow_right}>
          {" "}
          <div className={classes.list__arrow_right__button}>
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

export default AuctionItemList;
