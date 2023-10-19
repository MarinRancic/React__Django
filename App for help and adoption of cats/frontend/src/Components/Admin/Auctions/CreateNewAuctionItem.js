import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./CreateNewAuctionItem.module.css";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";

const CreateNewAuctionItem = () => {
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [startingPrice, setStartingPrice] = useState(0.1);
  const [minimumBid, setMinimumBid] = useState(0.1);
  const [status, setStatus] = useState();

  const naviage = useNavigate();
  const {authTokens, logoutUser} = useContext(AuthContext);
  
  const onSubmitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("starting_price", startingPrice);
    formData.append("minimum_bid", minimumBid);

    const response = axios
      .post("http://127.0.0.1:8000/api/auctionDetails/items", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        console.log(response);
        setName("");
        setImage("");
        setStartingPrice("");
        setMinimumBid("");
        setStatus({
          status: "success",
          message: "You have successfully added an item!",
        });
      })
      .catch((error) => {
        console.log(error);
        if(error.response.status === 401){
          logoutUser(false);
        }
        setStatus({ status: "error", message: "Something went wrong!" });
      });
  };

  const onViewItemsHandler = () => {
    naviage("items");
  };

  return (
    <div className={classes.new_auction_item}>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.new_auction_item__form}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
          <div className={classes.new_auction_item__form__picture}>
            {image ? (
              <img src={URL.createObjectURL(image)} />
            ) : (
              <p>Choose an image to preview</p>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setImage(event.target.files[0])}
          ></input>
          <div className={classes.new_auction_item__form__prices}>
            <div>
              <label htmlFor="starting_price">Starting price:</label>
              <input
                type="number"
                name="starting_price"
                step="0.1"
                min="0.1"
                defaultValue="0.1"
                onChange={(event) => setStartingPrice(event.target.value)}
                required
              ></input>
              &nbsp;&euro;
            </div>
            <div>
              <label htmlFor="bid_price">Minimum bid:</label>
              <input
                type="number"
                name="minimum_bid"
                step="0.1"
                min="0.1"
                defaultValue="0.1"
                onChange={(event) => setMinimumBid(event.target.value)}
                required
              ></input>
              &nbsp;&euro;
            </div>
          </div>
        </div>
        <button className={classes.create_button}>CREATE</button>
        <span
          className={
            status?.status === "success"
              ? classes.new_auction_item__success
              : classes.new_auction_item__error
          }
        >
          {status?.message}
        </span>
      </form>
      <button
        className={classes.view_items_button}
        onClick={onViewItemsHandler}
      >
        VIEW ALL ITEMS
      </button>
    </div>
  );
};

export default CreateNewAuctionItem;
