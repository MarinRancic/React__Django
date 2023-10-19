import classes from "./AuctionDetailsItem.module.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";

const AuctionDetailsItem = (props) => {
  const [name, setName] = useState(props.name);
  const [image, setImage] = useState(props.picture);
  const [startingPrice, setStartingPrice] = useState(props.startingPrice);
  const [minimumBid, setMinimumBid] = useState(props.minimumBid);
  const [auctionId, setAuctionId] = useState(props.auctionId);
  const [status, setStatus] = useState();

  const { authTokens, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setName(props.name);
    setImage(props.picture);
    setStartingPrice(props.startingPrice);
    setMinimumBid(props.minimumBid);
    setAuctionId(props.auctionId);
  }, [props]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("starting_price", startingPrice);
    formData.append("minimum_bid", minimumBid);
    if (auctionId === null) {
      formData.append("auction", "");
    } else {
      formData.append("auction", auctionId);
    }

    const response = axios
      .put(
        `http://127.0.0.1:8000/api/auctionDetails/items/${props.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + String(authTokens.access),
          },
        }
      )
      .then((response) => {
        props.getAuctionItems();
        setStatus({
          status: "success",
          message: "You have successfully updated an item!",
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          logoutUser(false);
        }
        setStatus({ status: "error", message: "Something went wrong!" });
      });
  };

  return (
    <div className={classes.auction_details_item}>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.auction_details_item__form}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              required
              defaultValue={props.name}
              onChange={(event) => setName(event.target.value)}
            ></input>
          </div>
          <div className={classes.auction_details_item__form__picture}>
            {props.picture ? (
              <img src={"http://127.0.0.1:8000/api" + props.picture} />
            ) : (
              <p>Choose an image to preview</p>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setImage(event.target.files[0])}
          ></input>
          <div className={classes.auction_details_item__form__prices}>
            <div
              className={
                classes.auction_details_item__form__prices__starting_price
              }
            >
              <label htmlFor="starting_price">Starting price:</label>
              <div>
                <input
                  type="number"
                  name="starting_price"
                  step="0.1"
                  defaultValue={props.startingPrice}
                  onChange={(event) => setStartingPrice(event.target.value)}
                  required
                ></input>
                &nbsp;&euro;
              </div>
            </div>
            <div
              className={classes.auction_details_item__form__prices__bid_price}
            >
              <label htmlFor="bid_price">Minimum bid:</label>
              <div>
                <input
                  type="number"
                  name="minimum_bid"
                  step="0.1"
                  defaultValue={props.minimumBid}
                  onChange={(event) => setMinimumBid(event.target.value)}
                  required
                ></input>
                &nbsp;&euro;
              </div>
            </div>
          </div>
          <div className={classes.auction_details_item__form__bid_holder}>
            <label htmlFor="bid_holder">
              Current bid holder:{" "}
              {props.bidHolder ? props.bidHolder : "No current bidder"}
            </label>
          </div>
          <div className={classes.auction_details_item__form__auctions}>
            <label htmlFor="auction_select">Auction:</label>
            <select
              name="auction_select"
              key={props.auctionId}
              defaultValue={props.auctionId}
              onChange={(event) => setAuctionId(event.target.value)}
            >
              <option value="">---</option>
              {props.allAuctions?.map((index) => (
                <option
                  label={index.starting.slice(0, 7).replace("-", "/")}
                  key={index.id}
                  value={index.id}
                >
                  {index.starting.slice(0, 7).replace("-", "/")}
                </option>
              ))}
            </select>
          </div>
          <button className={classes.update_button}>UPDATE</button>
          <span
            className={
              status?.status === "success"
                ? classes.auction_details_item__success
                : classes.auction_details_item__error
            }
          >
            {status?.message}
          </span>
        </div>
      </form>
    </div>
  );
};

export default AuctionDetailsItem;
