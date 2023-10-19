import classes from "./AuctionItemsDetails.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import AuctionItemList from "../../../../Components/Admin/Auctions/Items/AuctionItemList";
import ReactPaginate from "react-paginate";
import Search from "../../../../Components/Utils/Search/Search";
import { Link } from "react-router-dom";
import AuctionItemFilter from "../../../../Components/Admin/Auctions/Items/AuctionItemFilter";

const AuctionItemsDetails = () => {
  const [items, setItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemCount, setItemCount] = useState();
  const [auctions, setAuctions] = useState();
  const [filter, setFilter] = useState("active");
  const [status, setStatus] = useState({});

  useEffect(() => {
    getAllItems();
    setStatus();
  }, [currentPage, filter]);

  useEffect(() => {
    getAllAuctions();
  }, []);

  const getAllItems = (text = "") => {
    const response = axios
      .get(
        `http://127.0.0.1:8000/api/auctionDetails/items?page=${currentPage}&name=${text}&filter=${filter}`
      )
      .then((response) => {
        setItems(response.data.itemList);
        setItemCount(response.data.itemCount);
      })
      .catch((error) => console.log(error));
  };

  const getAllAuctions = () => {
    const response = axios
      .get("http://127.0.0.1:8000/api/auctionDetails")
      .then((response) => setAuctions(response.data))
      .catch((error) => console.log(error));
  };

  const statusHandler = (status) => {
    setStatus(status);
  };

  const onPageChangeHandler = (data) => {
    setCurrentPage(() => data.selected + 1);
    window.scroll(0, 250);
  };

  const onFilterChangeHandler = (value) => {
    setFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className={classes.auction_items_details}>
      <h2>Items for Auction</h2>
      <Search getAllItems={getAllItems} />
      <span
        className={
          status?.status === "success"
            ? classes.auction_items_details__success
            : classes.auction_items_details__error
        }
      >
        {status?.message}
      </span>
      <AuctionItemFilter
        onFilterChangeHandler={onFilterChangeHandler}
        filter={filter}
      />
      <Link to="/auctionDetails" className={classes.auction_item__back}>
        {"<<Back"}
      </Link>
      {items?.length !== 0 ? (
        <AuctionItemList
          getAllItems={getAllItems}
          items={items}
          auctions={auctions}
          statusHandler={statusHandler}
        />
      ) : (
        <p className={classes.no_items}>No items to display</p>
      )}
      {items?.length !== 0 ? (
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          pageCount={Math.ceil(itemCount / 4)}
          onPageChange={onPageChangeHandler}
          className={classes.pagination}
          activeClassName={classes.pagination_active}
          disabledClassName={classes.pagination_disable}
          forcePage={currentPage - 1}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default AuctionItemsDetails;
