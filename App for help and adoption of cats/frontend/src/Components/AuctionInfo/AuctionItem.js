import { useContext, useEffect, useState } from "react";
import classes from "./AuctionItem.module.css";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const AuctionItem = (props) => {
  const [bidPrice, setBidPrice] = useState(
    props.minimumBid + props.startingPrice
  );
  const [message, setMessage] = useState();
  const { user, authTokens } = useContext(AuthContext);

  const navigate = useNavigate();

  const onRedirectToLoginHandler = () => {
    navigate("/login");
  };

  const onRedirectToRegisterHandler = () => {
    navigate("/registration");
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(bidPrice);
    if (
      parseFloat(bidPrice) <
      parseFloat(props.minimumBid) + parseFloat(props.startingPrice)
    ) {
      setMessage({
        status: "error",
        text: `Bid was too low, minimum bid is ${
          parseFloat(props.minimumBid) + parseFloat(props.startingPrice)
        }€`,
      });
    } else {
      const response = axios
        .put(
          `http://127.0.0.1:8000/api/auctionDetails/items/${props.id}`,
          {
            starting_price: bidPrice,
            bid_holder: user.user_id,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + String(authTokens.access),
            },
          }
        )
        .then((response) => {
          setMessage({
            status: "success",
            text: "You have successfully placed a bid!",
          });
          props.getAllItems();
        })
        .catch((error) => console.log(error));
    }
  };
  useEffect(() => {
    setBidPrice(parseFloat(props.minimumBid) + parseFloat(props.startingPrice));
  }, [props.minimumBid, props.startingPrice]);

  return (
    <div className={classes.auction_items}>
      <div className={classes.auction_items__name}>{props.name}</div>
      <div className={classes.auction_items__picture}>
        {props.picture ? (
          <img src={"http://127.0.0.1:8000/api" + props.picture} />
        ) : (
          <p>No image to display</p>
        )}
      </div>
      <div className={classes.auction_items__prices}>
        <div>
          <label htmlFor="current_price">Current price:</label>
          <span>{props.startingPrice}&euro;</span>
        </div>
        <div>
          <label htmlFor="bid_price">Minimum bid:</label>
          <span>{props.minimumBid}&euro;</span>
        </div>
      </div>
      <div className={classes.auction_items__bid_holder}>
        <label htmlFor="bid_holder">Bid holder:</label>
        {props.bidHolderUsername ? (
          <span>
            {props.bidHolderUsername}
            {props.bidHolderVerified && <FontAwesomeIcon icon={faCheckCircle} className={classes.auction_items__bid_holder__verified_icon} />}
          </span>
        ) : (
          <span id={classes.no_bids}>NO BIDDERS YET</span>
        )}
      </div>
      {user ? (
        <div className={classes.auction_items__bid}>
          <input
            type="number"
            name="bid"
            min={parseFloat(props.minimumBid) + parseFloat(props.startingPrice)}
            value={bidPrice}
            onChange={(event) => setBidPrice(event.target.value)}
          ></input>
          <button onClick={onSubmitHandler} className={classes.bid_button}>
            BID
          </button>
        </div>
      ) : (
        <div className={classes.auction_items__redirects}>
          <span onClick={onRedirectToLoginHandler}>Login</span> or{" "}
          <span onClick={onRedirectToRegisterHandler}>Register</span> to
          participate in auction
        </div>
      )}
      <div
        className={`${classes.auction_items__message} ${
          message?.status === "error"
            ? classes.auction_items__message__error
            : classes.auction_items__message__success
        }`}
      >
        {message?.text}
      </div>
    </div>
  );
};

export default AuctionItem;
