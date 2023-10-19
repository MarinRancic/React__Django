import Search from '../../../Utils/Search/Search';
import AuctionDetailsItem from './AuctionDetailsItem';
import classes from './AuctionDetailsItemList.module.css';

const AuctionDetailsItemList = (props) => {
  return (
    <div className={classes.auction_details_list}>
      <h2>Items for <b>{props.auction_name}</b> auction</h2>
      <Search getAllItems={props.getAuctionItems}/>
      <div className={classes.auction_details_list__items}>
        {props.items?.length !== 0
          ? props.items?.map((index) => (
              <AuctionDetailsItem
                key={index.id}
                id={index.id}
                picture={index.picture}
                name={index.name}
                startingPrice={index.starting_price}
                minimumBid={index.minimum_bid}
                bidHolder={index.bid_holder}
                auctionId={index.auction}
                getAuctionItems={props.getAuctionItems}
                allAuctions = {props.allAuctions}
              />
            ))
          : <p className={classes.no_items}>No items to display</p>}
      </div>
    </div>
  )
}

export default AuctionDetailsItemList