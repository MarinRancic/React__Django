import classes from "./WaitingAdoptionDetails.module.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Search from "../../../Utils/Search/Search";
import WaitingAdoptionDetailsList from "./WaitingAdoptionDetailsList";
import ReactPaginate from "react-paginate";
import AuthContext from "../../../Context/AuthContext";

const WaitingAdoptionDetails = (props) => {
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [info, setInfo] = useState();
  const [message, setMessage] = useState();
  const [cats, setCats] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemCount, setItemCount] = useState();

  const {authTokens, logoutUser} = useContext(AuthContext);

  const onPageChangeHandler = (data) => {
    setCurrentPage(() => data.selected + 1);
    window.scroll(0, 750);
  };

  const messageHandler = (message) => {
    setMessage(message);
    message.message.includes("delete") && window.scroll(0, 550);
  };

  const getAllWaiting = (text = "") => {
    const response = axios
      .get(
        `http://127.0.0.1:8000/api/catList?page=${currentPage}&name=${text}&status=waiting`
      )
      .then((response) => {
        setCats(response.data.itemList);
        setItemCount(response.data.itemCount);
      })
      .catch((error) => console.log(error));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("info", info);
    formData.append("status", "waiting");

    const response = axios
      .post("http://127.0.0.1:8000/api/catList", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        getAllWaiting();
        setMessage({
          status: "success",
          message: "You have successfully added a new cat for adoption!",
        });
        setName("");
        setImage("");
        setInfo("");
      })
      .catch((error) =>{
        if(error.response.status === 401){
          logoutUser(false);
        }
        setMessage({ status: "error", message: "Something went wrong!" })
      }
      );
  };

  useEffect(() => {
    getAllWaiting();
  }, [currentPage]);

  return (
    <div className={classes.waiting_adoption_details}>
      <h2>Add new cat for adoption</h2>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.waiting_adoption_details__form}>
          <div className={classes.waiting_adoption_details__form__name}>
            <label htmlFor="name">Name:</label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className={classes.waiting_adoption_details__form__picture}>
            <div
              className={
                classes.waiting_adoption_details__form__picture__background
              }
            >
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

          <div className={classes.waiting_adoption_details__form__info}>
            <label htmlFor="info">Cat Info:</label>
            <textarea
              name="info"
              value={info}
              onChange={(event) => setInfo(event.target.value)}
            />
          </div>
          <button>ADD</button>
        </div>
      </form>
      <p
        className={
          message?.status === "success"
            ? classes.waiting_adoption_details__success
            : classes.waiting_adoption_details__error
        }
      >
        {message?.message}
      </p>
      <Search getAllItems={getAllWaiting} />
      <WaitingAdoptionDetailsList
        getAllWaiting={getAllWaiting}
        cats={cats}
        messageHandler={messageHandler}
      />
      {cats?.length !== 0 ? (
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          pageCount={Math.ceil(itemCount / 8)}
          onPageChange={onPageChangeHandler}
          className={classes.pagination}
          activeClassName={classes.pagination_active}
          disabledClassName={classes.pagination_disable}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default WaitingAdoptionDetails;
