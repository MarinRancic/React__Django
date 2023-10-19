import classes from "./CreateNewAuction.module.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

const CreateNewAuction = (props) => {
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [info, setInfo] = useState();
  const [message, setMessage] = useState("");
  const { authTokens, logoutUser } = useContext(AuthContext);

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      setMessage(state);
    }
  }, [state]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (startTime >= endTime) {
      setMessage({
        message: "Starting time must be sooner than ending time!",
        status: "error",
      });
    } else {
      const response = axios
        .post(
          "http://127.0.0.1:8000/api/auctionDetails",
          {
            starting: startTime,
            ending: endTime,
            info: info,
          },
          {
            headers: {
              Authorization: "Bearer " + String(authTokens.access),
            },
          }
        )
        .then((response) => {
          console.log(response);
          setMessage({
            message: "Successfully added auction!",
            status: "success",
          });
          props.getAllAuctions();
          setStartTime("");
          setEndTime("");
          setInfo("");
        })
        .catch((error) => {
          console.log(error);
          if(error.response.status === 401){
            logoutUser(false);
          }
        });
    }
  };

  return (
    <>
      <div className={classes.new_auction}>
        <form onSubmit={onSubmitHandler}>
          <div className={classes.new_auction__form}>
            <label htmlFor="info">Auction Info:</label>
            <textarea
              name="info"
              value={info}
              required
              onChange={(event) => setInfo(event.target.value)}
            />
            <div className={classes.new_auction__form__start}>
              <label htmlFor="start_date">Start:</label>
              <input
                type="datetime-local"
                name="start_date"
                value={startTime}
                required
                onChange={(event) =>
                  setStartTime(event.target.value.replace("T", " "))
                }
              />
            </div>
            <div className={classes.new_auction__form__end}>
              <label htmlFor="end_date">End:</label>
              <input
                type="datetime-local"
                value={endTime}
                name="end_date"
                required
                onChange={(event) =>
                  setEndTime(event.target.value.replace("T", " "))
                }
              />
            </div>
            <button>CREATE</button>
          </div>
        </form>
        <div className={classes.new_auction__archive}>
          <h3>Auctions</h3>
          {props.auctions
            ? props.auctions.map((index) => (
                <Link
                  className={
                    index.active ? classes.link__active : classes.link__inactive
                  }
                  key={index.id}
                  to={"/auctionDetails/" + index.id}
                >
                  {index.starting.slice(0, 7).replace("-", "/")}
                </Link>
              ))
            : ""}
        </div>
      </div>
      <span
        className={
          message?.status === "success"
            ? classes.new_auction__success
            : classes.new_auction__error
        }
      >
        {message?.message}
      </span>
    </>
  );
};

export default CreateNewAuction;
