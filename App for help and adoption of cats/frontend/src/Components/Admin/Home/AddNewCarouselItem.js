import classes from "./AddNewCarouselItem.module.css";
import { useContext, useState } from "react";
import { Switch } from "antd";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddNewCarouselItem = (props) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState();
  const [isLink, setIsLink] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [position, setPosition] = useState("not_set");

  const { authTokens, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onToggleHandler = () => {
    isLink ? setIsLink(false) : setIsLink(true);
  };

  const onSuccess = () => {
    setText("");
    setImage();
    setIsLink(false);
    setLinkUrl("");
    setPosition("not_set");
    props.getAllCarouselItems();
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("text", text);
    formData.append("is_link", isLink);
    formData.append("link_url", linkUrl);
    formData.append("position", position);

    const response = axios
      .post("http://127.0.0.1:8000/api/carouselDetails", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        props.statusHandler({
          status: "success",
          message: "You have successfully added a new post!",
        });
        onSuccess();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          logoutUser(false);
        }
        props.statusHandler({
          status: "error",
          message: "Something went wrong!",
        });
      });
  };

  return (
    <div className={classes.new_carousel_item}>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.new_carousel_item_form}>
          <div className={classes.new_carousel_item_form_left}>
            <label>Carousel text:</label>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <div className={classes.new_carousel_item__link}>
              <label>Enable link: </label>
              <Switch
                className={isLink ? classes.active : classes.inactive}
                onClick={onToggleHandler}
                checked={isLink}
              />
              {isLink && (
                <input
                  type="text"
                  value={linkUrl}
                  placeholder="http://localhost:3000/carouselDetails"
                  onChange={(event) => setLinkUrl(event.target.value)}
                />
              )}
            </div>
            <label htmlFor="position">Position in carousel:</label>
            <select
              name="position"
              value={position}
              onChange={(event) => setPosition(event.target.value)}
            >
              <option value="not_set">None</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className={classes.new_carousel_item_form_right}>
            <div className={classes.new_carousel_item_form_right__image}>
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
          </div>

          <button id={classes.submit_button}>ADD</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewCarouselItem;
