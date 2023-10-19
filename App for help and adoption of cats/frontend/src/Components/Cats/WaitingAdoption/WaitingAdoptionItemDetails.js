import classes from "./WaitingAdoptionItemDetails.module.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";

const WaitingAdoptionItemDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [cat, setCat] = useState();
  const [toggle, setToggle] = useState(false);
  const [message, setMessage] = useState();
  const [info, setInfo] = useState();

  const requestAdoption = () => {
    if(!user){
      setMessage({
        status: "error",
        message: "Please make an account to send adoption requests!",
      });
      return;
    }
    if (message) {
      setMessage({});
    }
    if (!toggle) {
      setToggle(true);
    } else {
      const response = axios
        .post("http://127.0.0.1:8000/api/adoptionRequest", {
          message: info,
          cat: id,
          user: user.user_id,
        })
        .then((response) => {
          setMessage({
            status: "success",
            message: "You have successfully sent an adoption request!",
          });
          setToggle(false);
        })
        .catch((error) => {
          setMessage({
            status: "error",
            message: "Something went wrong!",
          });
        });
    }
  };

  useEffect(() => {
    const response = axios
      .get(`http://127.0.0.1:8000/api/catList/${id}`)
      .then((response) => setCat(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={classes.waiting_adoption_item_details}>
      <div className={classes.waiting_adoption_item_details__card}>
        <div className={classes.waiting_adoption_item_details__name}>
          <h2>{cat?.name}</h2>
        </div>
        <div className={classes.waiting_adoption_item_details__picture}>
          <img src={"http://127.0.0.1:8000/api" + cat?.picture} alt="Error" />
        </div>
        <div className={classes.waiting_adoption_item_details__info}>
          <span>{cat?.info}</span>
        </div>
        {toggle ? (
          <textarea
            onChange={(event) => {
              setInfo(event.target.value);
            }}
            placeholder={`Give us a brief explanation why would you like to adopt ${cat?.name}`}
          ></textarea>
        ) : (
          ""
        )}
        {
          <p
            className={
              message?.status === "success"
                ? classes.waiting_adoption_item_details__success
                : classes.waiting_adoption_item_details__error
            }
          >
            {message?.message}
          </p>
        }
        <button
          onClick={requestAdoption}
          className={classes.waiting_adoption_item_details__button}
        >
          {toggle ? "SEND REQUEST" : "REQUEST ADOPTION"}
        </button>
      </div>
    </div>
  );
};

export default WaitingAdoptionItemDetails;
