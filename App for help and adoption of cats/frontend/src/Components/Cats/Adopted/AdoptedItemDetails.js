import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./AdoptedItemDetails.module.css";
import { useParams } from "react-router-dom";

const AdoptedItemDetails = () => {
  const { id } = useParams();
  const [cat, setCat] = useState();

  useEffect(() => {
    const response = axios
      .get(`http://127.0.0.1:8000/api/catList/${id}`)
      .then((response) => setCat(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={classes.adopted_item_details}>
      <div className={classes.adopted_item_details__card}>
        <div className={classes.adopted_item_details__name}>
          <h2>{cat?.name}</h2>
        </div>
        <div className={classes.adopted_item_details__picture}>
          <img src={"http://127.0.0.1:8000/api" + cat?.picture} alt="Error" />
        </div>
        <div className={classes.adopted_item_details__info}>
          <span>{cat?.info}</span>
        </div>
      </div>
    </div>
  );
};

export default AdoptedItemDetails;
