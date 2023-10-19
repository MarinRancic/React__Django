import classes from "./AuctionArchive.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import ReactPaginate from "react-paginate";
import AuctionArchiveList from "./Items/AuctionArchiveList";
import Search from "../../Utils/Search/Search";
import AuthContext from "../../Context/AuthContext";

const AuctionArchive = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemCount, setItemCount] = useState();

  const { authTokens } = useContext(AuthContext);

  const onPageChangeHandler = (data) => {
    setCurrentPage(() => data.selected + 1);
    window.scroll(0, 250);
  };
  const onPageDecreaseHandler = () => {
    setCurrentPage((prevState) => prevState - 1);
  };
  const onPageIncreaseHandler = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  const getAuctionItems = (text = "") => {
    const response = axios
      .get(
        `http://127.0.0.1:8000/api/auctionDetails/items/${id}?page=${currentPage}&name=${text}&displayItems=3`
      )
      .then((response) => {
        setItems(response.data.itemList);
        setItemCount(response.data.itemCount);
      })
      .catch((error) => console.log(error));
  };
  console.log(items?.length);
  useEffect(() => {
    getAuctionItems();
  }, [currentPage]);

  return (
    <div className={classes.auction_archive}>
      <h2>Auction Archive</h2>
      <Search getAllItems={getAuctionItems} />
      {items?.length !== 0 ? (
        <AuctionArchiveList
          currentPage={currentPage}
          itemCount={itemCount}
          onPageIncreaseHandler={onPageIncreaseHandler}
          onPageDecreaseHandler={onPageDecreaseHandler}
          items={items}
          getAllItems={getAuctionItems}
        />
      ) : (
        <p className={classes.no_items}>No items to display</p>
      )}
      {items?.length !== 0 ? (
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          pageCount={Math.ceil(itemCount / 3)}
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

export default AuctionArchive;
