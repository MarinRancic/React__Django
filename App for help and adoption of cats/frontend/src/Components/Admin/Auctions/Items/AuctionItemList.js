import classes from "./AuctionItemList.module.css";
import AuctionItem from "./AuctionItem";

const AuctionItemList = (props) => {
  
  return (
    <div className={classes.auction_item_list}>
      <div className={classes.auction_items}>
        {props?.items
          ? props.items.map((index) => (
              <AuctionItem
                key={index.id}
                id={index.id}
                picture={index.picture}
                name={index.name}
                active={index.active}
                startingPrice={index.starting_price}
                minimumBid={index.minimum_bid}
                auctionId={index.auction}
                getAllItems={props.getAllItems}
                auctions={props.auctions}
                statusHandler={props.statusHandler}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default AuctionItemList;
