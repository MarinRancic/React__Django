import classes from "./Auction.module.css";
import AuctionItemList from "../../Components/AuctionInfo/AuctionItemList";
import ChangeAuctionInfoButton from "../../Components/Admin/Auctions/ChangeAuctionInfoButton";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import AuctionItemsSearch from "../../Components/Utils/Search/Search";
import { intervalToDuration } from "date-fns";
import { Link } from "react-router-dom";
import AuthContext from "../../Components/Context/AuthContext";

const Auction = () => {
  const [auction, setAuction] = useState();
  const [items, setItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemCount, setItemCount] = useState();
  const [auctionTime, setAuctionTime] = useState();
  const [dateNow, setDateNow] = useState(new Date());
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [archivedAuctions, setArchivedAuctions] = useState();

  const { user, authTokens } = useContext(AuthContext);

  const onPageChangeHandler = (data) => {
    setCurrentPage(() => data.selected + 1);
    window.scroll(0, 550);
  };

  const onPageDecreaseHandler = (data) => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const onPageIncreaseHandler = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  const getAllItems = (text = "") => {
    if (auction?.id) {
      const response = axios
        .get(
          `http://127.0.0.1:8000/api/auctionDetails/items/${auction.id}?page=${currentPage}&name=${text}&displayItems=3`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          setItems(response.data.itemList);
          setItemCount(response.data.itemCount);
        })
        .catch((error) => console.log(error));
    }
  };

  const getAuction = () => {
    const response = axios
      .get("http://127.0.0.1:8000/api/auction")
      .then((response) => {
        setAuction(response.data);
        setDateStart(new Date(response.data.starting));
        setDateEnd(new Date(response.data.ending));
      })
      .catch((error) => console.log(error));
  };

  const setAuctionInActive = () => {
    const response = axios
      .put(
        `http://127.0.0.1:8000/api/auctionDetails/${auction?.id}`,
        {
          active: "false",
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => console.log(response))
      .catch((error) => console.log());
  };

  const getArchive = () => {
    const response = axios
      .get("http://127.0.0.1:8000/api/auction/archives", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => setArchivedAuctions(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (auction?.active) {
      const interval = setInterval(() => {
        setDateNow(new Date());
        if (dateStart && dateStart > dateNow) {
          setAuctionTime(
            intervalToDuration({ start: dateNow, end: dateStart })
          );
        } else if (dateStart && dateEnd && dateNow < dateEnd) {
          setAuctionTime(intervalToDuration({ start: dateNow, end: dateEnd }));
        } else {
          setAuctionTime("");
          setAuctionInActive();
          getAuction();
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  });

  useEffect(() => {
    getAuction();
    getArchive();
  }, []);

  useEffect(() => {
    getAllItems();
  }, [auction, currentPage]);

  return (
    <div className={classes.auction}>
      {user?.role === "admin" && <ChangeAuctionInfoButton />}
      <h1>Welcome to an auction!</h1>
      <div className={classes.auction__info}>
        <div className={classes.auction__info__news}>{auction?.info}</div>
        <div className={classes.auction__info__archive}>
          <h3>Archive</h3>
          {archivedAuctions?.length !== 0 ? (
            <div className={classes.auction__info__archive__links}>
              {archivedAuctions?.map((index) => (
                <Link key={index.id} to={`archive/${index.id}`}>
                  {index.starting.slice(0, 7).replace("-", "/")}
                </Link>
              ))}
            </div>
          ) : (
            "No archives yet"
          )}
        </div>
      </div>
      <div className={classes.auction__info__timer_text}>
        {auctionTime ? (
          <div>
            {dateNow < dateStart ? (
              <h2 style={{ color: "#66df33" }}>Next auction starts in</h2>
            ) : (
              <h2 style={{ color: "#df5633" }}>Time left for this auction</h2>
            )}
          </div>
        ) : (
          <h2 style={{ color: "#df5633" }}>
            There is no active auction at the moment, please check back later!
          </h2>
        )}
      </div>
      {auctionTime ? (
        <div className={classes.auction__info__timer}>
          {auctionTime?.months !== 0 && (
            <div className={classes.auction__info__timer__digits}>
              {auctionTime?.months <= 9
                ? "0" + auctionTime?.months
                : auctionTime?.months}
              <span>Months</span>
            </div>
          )}
          <div className={classes.auction__info__timer__digits}>
            {auctionTime?.days <= 9
              ? "0" + auctionTime?.days
              : auctionTime?.days}
            <span>Days</span>
          </div>
          :
          <div className={classes.auction__info__timer__digits}>
            {auctionTime?.hours <= 9
              ? "0" + auctionTime?.hours
              : auctionTime?.hours}
            <span>Hours</span>
          </div>
          :
          <div className={classes.auction__info__timer__digits}>
            {auctionTime?.minutes <= 9
              ? "0" + auctionTime?.minutes
              : auctionTime?.minutes}
            <span>Minutes</span>
          </div>
          :
          <div className={classes.auction__info__timer__digits}>
            {auctionTime?.seconds <= 9
              ? "0" + auctionTime?.seconds
              : auctionTime?.seconds}
            <span>Seconds</span>
          </div>
        </div>
      ) : (
        ""
      )}

      {auction && dateNow > dateStart ? (
        <AuctionItemsSearch getAllItems={getAllItems} />
      ) : (
        ""
      )}
      {auction && items?.length !== 0 && dateNow > dateStart ? (
        <AuctionItemList
          currentPage={currentPage}
          itemCount={itemCount}
          onPageIncreaseHandler={onPageIncreaseHandler}
          onPageDecreaseHandler={onPageDecreaseHandler}
          items={items}
          getAllItems={getAllItems}
        />
      ) : (
        <p className={classes.no_items}>No items to display</p>
      )}
      {items?.length !== 0 && auction && items && dateNow > dateStart ? (
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

export default Auction;
