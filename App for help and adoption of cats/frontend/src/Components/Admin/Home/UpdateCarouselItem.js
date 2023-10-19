import classes from "./UpdateCarouselItem.module.css";
import { useState, useEffect, useContext } from "react";
import { Switch } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import DeleteModal from "../../UI/Modals/DeleteModal";
import AuthContext from "../../Context/AuthContext";

const UpdateCarouselItem = (props) => {
  const [text, setText] = useState(props.text);
  const [image, setImage] = useState(props.image);
  const [isLink, setIsLink] = useState(props.isLink);
  const [linkUrl, setLinkUrl] = useState(props.linkUrl);
  const [position, setPosition] = useState(props.position);
  const [status, setStatus] = useState({});
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  const { authTokens, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    setText(props.text);
    setImage(props.image);
    setIsLink(props.isLink);
    setLinkUrl(props.linkUrl);
    setPosition(props.position);
  }, [props]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("text", text);
    formData.append("is_link", isLink);
    formData.append("link_url", linkUrl);
    formData.append("position", position);
    const response = axios
      .put(`http://127.0.0.1:8000/api/carouselDetails/${props.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        setStatus({
          status: "success",
          message: "You have successfully updated a post!",
        });
        props.getAllCarouselItems();
      })
      .catch((error) => {
        console.log(error);
        if(error.response.status === 401){
          logoutUser(false);
        }
        setStatus({ status: "error", message: "Something went wrong!" });
      });
  };

  const onToggleHandler = () => {
    isLink ? setIsLink(false) : setIsLink(true);
  };

  const cancelConfirmDeleteModal = () => {
    setConfirmDeleteModal(false);
  };

  const onDeleteHandler = () => {
    const response = axios
      .delete(`http://127.0.0.1:8000/api/carouselDetails/${props.id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((resposne) => {
        props.getAllCarouselItems();
        props.statusHandler({
          status: "success",
          message: "You have successfully deleted an item!",
        });
      })
      .catch((error) => {
        console.log(error);
        if(error.response.status === 401){
          logoutUser(false);
        }
        props.statusHandler({
          status: "error",
          message: "Something went wrong!",
        });
      });
  };

  return (
    <div className={classes.carousel_details_item}>
      {confirmDeleteModal && (
        <DeleteModal
          cancelConfirmDeleteModal={cancelConfirmDeleteModal}
          onDeleteHandler={onDeleteHandler}
        />
      )}
      <form onSubmit={onSubmitHandler}>
        <div className={classes.carousel_details_item_form}>
          <div className={classes.x}>
            <FontAwesomeIcon
              icon={faX}
              onClick={() => {
                setConfirmDeleteModal(true);
              }}
              size="2xl"
            />
          </div>
          <div className={classes.carousel_details_item_form_left}>
            <label>Carousel text:</label>
            <textarea
              required
              defaultValue={props.text}
              onChange={(event) => setText(event.target.value)}
            />
            <div className={classes.carousel_details_item__link}>
              <label>Enable link: </label>
              <Switch
                checked={isLink}
                className={isLink ? classes.active : classes.inactive}
                onClick={onToggleHandler}
              />
              {isLink && (
                <input
                  type="text"
                  placeholder="http://localhost:3000/carouselDetails"
                  defaultValue={props.linkUrl}
                  onChange={(event) => setLinkUrl(event.target.value)}
                />
              )}
            </div>
            <label htmlFor="position">Position in carousel:</label>
            <select
              name="position"
              key={props.position}
              defaultValue={props.position}
              onChange={(event) => setPosition(event.target.value)}
            >
              <option value="not_set">None</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className={classes.carousel_details_item_form_right}>
            <div className={classes.carousel_details_item_form_right__image}>
              {props.image ? (
                <img src={"http://127.0.0.1:8000/api" + props.image} />
              ) : (
                <p>Choose an image to preview</p>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setImage(event.target.files[0])}
            ></input>
          </div>

          <button id={classes.submit_button}>UPDATE</button>
          <span
            className={
              status?.status === "success"
                ? classes.carousel_details_items__success
                : classes.carousel_details_items__error
            }
          >
            {status?.message}
          </span>
        </div>
      </form>
    </div>
  );
};

export default UpdateCarouselItem;
