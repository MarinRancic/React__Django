import CreateNewAuction from "../../../Components/Admin/Auctions/CreateNewAuction";
import classes from "./AuctionDetails.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import CreateNewAuctionItem from "../../../Components/Admin/Auctions/CreateNewAuctionItem";

const AuctionDetails = () => {
  const [auctions, setAuctions] = useState();

  const getAllAuctions = () => {
    const response = axios
      .get("http://127.0.0.1:8000/api/auctionDetails")
      .then((response) => setAuctions(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllAuctions();
  }, []);

  return (
    <div className={classes.auction_details}>
      <h2>Create new auction</h2>
      <CreateNewAuction auctions={auctions} getAllAuctions={getAllAuctions} />
      <hr />
      <h2>Create new item</h2>
      <CreateNewAuctionItem getAllAuctions={getAllAuctions} />
    </div>
  );
};

export default AuctionDetails;
