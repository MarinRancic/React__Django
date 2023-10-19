import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./EditAuctionDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Switch } from "antd";
import { Link } from "react-router-dom";
import AuctionDetailsItemList from "./Items/AuctionDetailsItemList";
import ReactPaginate from "react-paginate";
import DeleteModal from "../../UI/Modals/DeleteModal";
import AuthContext from "../../Context/AuthContext";

const EditAuctionDetails = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState();
  const [allAuctions, setAllAuctions] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [info, setInfo] = useState();
  const [active, setActive] = useState();
  const [items, setItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemCount, setItemCount] = useState();
  const [status, setStatus] = useState();
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  const { authTokens, logoutUser } = useContext(AuthContext);

  const navigate = useNavigate();
  
  const onToggleHandler = () => {
    if (new Date() < new Date(endTime)) {
      active ? setActive(false) : setActive(true);
    } else {
      setStatus({
        status: "error",
        message: "Auction ended, it can't be activated!",
      });
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const response = axios
      .put(
        `http://127.0.0.1:8000/api/auctionDetails/${id}`,
        {
          info: info,
          starting: startTime,
          ending: endTime,
          active: active,
        },
        {
          headers: {
            Authorization: "Bearer " + String(authTokens.access),
          },
        }
      )
      .then((resposne) => {
        setStatus({
          status: "success",
          message: "You have successfully updated auction!",
        });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          logoutUser(false);
        }
        setStatus({ status: "error", message: "Something went wrong!" });
      });
  };

  const onDeleteHandler = () => {
    const response = axios
      .delete(`http://127.0.0.1:8000/api/auctionDetails/${id}`, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((resposne) => {
        navigate("/auctionDetails", {
          state: {
            message: "Auction successfully deleted!",
            status: "success",
          },
        });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          logoutUser(false);
        }
        console.log(error);
      });
  };

  const getAuctionItems = (text = "") => {
    const response = axios
      .get(
        `http://127.0.0.1:8000/api/auctionDetails/items/${id}?page=${currentPage}&name=${text}`
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
      .then((response) => setAllAuctions(response.data))
      .catch((error) => console.log(error));
  };

  const cancelConfirmDeleteModal = () => {
    setConfirmDeleteModal(false);
  };

  const onPageChangeHandler = (data) => {
    setCurrentPage(() => data.selected + 1);
    window.scroll(0, 650);
  };

  useEffect(() => {
    const response = axios
      .get(`http://127.0.0.1:8000/api/auctionDetails/${id}`)
      .then((response) => {
        setAuction(response.data);
        setStartTime(response.data.starting);
        setEndTime(response.data.ending);
        setInfo(response.data.info);
        setActive(response.data.active);
      })
      .catch((error) => console.log(error));
    getAuctionItems();
    getAllAuctions();
  }, []);

  const formatDateToInput = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().slice(0, 16);
    return formattedDate;
  };

  return (
    <div className={classes.auction_details}>
      {confirmDeleteModal && (
        <DeleteModal
          cancelConfirmDeleteModal={cancelConfirmDeleteModal}
          onDeleteHandler={onDeleteHandler}
        />
      )}
      <Link to="/auctionDetails" className={classes.auction_details__back}>
        {"<<Back"}
      </Link>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.auction_details__form}>
          <div className={classes.x}>
            <FontAwesomeIcon
              icon={faX}
              onClick={() => {
                setConfirmDeleteModal(true);
              }}
              size="xl"
            />
          </div>
          <label htmlFor="info">Auction Info:</label>
          <textarea
            name="info"
            required
            defaultValue={auction?.info}
            onChange={(event) => setInfo(event.target.value)}
          />
          <div className={classes.auction_details__form__start}>
            <label htmlFor="start_date">Start:</label>
            <input
              type="datetime-local"
              name="start_date"
              required
              defaultValue={auction?.starting && formatDateToInput(auction?.starting.replace("Z", ""))}
              onChange={(event) => setStartTime(event.target.value)}
            />
          </div>
          <div className={classes.auction_details__form__end}>
            <label htmlFor="end_date">End:</label>
            <input
              type="datetime-local"
              name="end_date"
              required
              defaultValue={auction?.starting && formatDateToInput(auction?.ending.replace("Z", ""))}
              onChange={(event) => setEndTime(event.target.value)}
            />
          </div>
          <div className={classes.auction_details__active}>
            <label>Enable auction: </label>
            <Switch
              checked={active}
              className={active ? classes.active : classes.inactive}
              onClick={onToggleHandler}
            />
          </div>
          <button className={classes.auction_details__edit}>EDIT</button>
          <span
            className={
              status?.status === "success"
                ? classes.auction_details__success
                : classes.auction_details__error
            }
          >
            {status?.message}
          </span>
        </div>
      </form>

      <AuctionDetailsItemList
        items={items}
        allAuctions={allAuctions}
        getAuctionItems={getAuctionItems}
        auction_name={auction?.starting.slice(0, 7).replace("-", "/")}
      />

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
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default EditAuctionDetails;
