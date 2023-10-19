import axios from "axios";
import { useContext, useEffect, useState } from "react";
import classes from "./WaitingAdoptionDetailsItem.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Switch } from "antd";
import { Link } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";

const WaitingAdoptionDetailsItem = () => {
  const { id } = useParams();
  const [cat, setCat] = useState();
  const [message, setMessage] = useState();
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [info, setInfo] = useState();
  const [status, setStatus] = useState();

  const {authTokens, logoutUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const getCat = () => {
    const response = axios
      .get(`http://127.0.0.1:8000/api/catList/${id}`)
      .then((response) => {
        setCat(response.data);
        setStatus(response.data.status);
        setName(response.data.name);
        setInfo(response.data.info);
      })
      .catch((error) => console.log(error));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("info", info);
    formData.append("status", status);

    const response = axios
      .put(`http://127.0.0.1:8000/api/catList/${cat?.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        if (status === "adopted") {
          navigate("/waitingAdoptionDetails");
        } else {
          getCat();
          setMessage({
            status: "success",
            message: "You have successfully updated an item!",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        if(error.response.status === 401){
          logoutUser(false);
        }
        setMessage({ status: "error", message: "Something went wrong!" });
      });
  };

  const onToggleHandler = () => {
    status === "adopted" ? setStatus("waiting") : setStatus("adopted");
  };

  useEffect(() => {
    getCat();
  }, []);

  return (
    <div className={classes.waiting_adoption_details_item}>
      <Link
        to="/waitingAdoptionDetails"
        className={classes.waiting_adoption_details_item__back}
      >
        {"<<Back"}
      </Link>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.waiting_adoption_details_item__form}>
          <div className={classes.waiting_adoption_details_item__name}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              defaultValue={cat?.name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className={classes.waiting_adoption_details_item__picture}>
            {cat?.picture ? (
              <img src={"http://127.0.0.1:8000/api" + cat.picture} />
            ) : (
              <p>Choose an image to preview</p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setImage(event.target.files[0])}
            ></input>
          </div>
          <div className={classes.waiting_adoption_details_item__info}>
            <label>Info:</label>
            <textarea
              defaultValue={cat?.info}
              onChange={(event) => setInfo(event.target.value)}
            ></textarea>
          </div>
          <div className={classes.waiting_adoption_details_item__active}>
            <label
              style={{ fontWeight: status === "adopted" ? 600 : "normal" }}
            >
              Adopted
            </label>
            <Switch
              checked={status === "waiting" ? true : false}
              className={
                status === "waiting" ? classes.active : classes.inactive
              }
              onClick={onToggleHandler}
            />
            <label
              style={{ fontWeight: status === "waiting" ? 600 : "normal" }}
            >
              Waiting
            </label>
          </div>
          {status === "adopted" ? (
            <p>
              Setting this option to "adopted" will result{" "}
              <b style={{ color: "blue" }}>{cat?.name}</b> moving to Adopted
              section!
            </p>
          ) : (
            ""
          )}
          <button className={classes.waiting_adoption_details_item__edit}>
            EDIT
          </button>
          <span
            className={
              message?.status === "success"
                ? classes.waiting_adoption_details_item__success
                : classes.waiting_adoption_details_item__error
            }
          >
            {message?.message}
          </span>
        </div>
      </form>
    </div>
  );
};

export default WaitingAdoptionDetailsItem;
