import classes from "./CarouselDetails.module.css";
import AddNewCarouselItem from "../../../Components/Admin/Home/AddNewCarouselItem";
import UpdateCarouselList from "../../../Components/Admin/Home/UpdateCarouselList";
import {useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const CarouselDetails = () => {
  const [carouselItems, setCarouselItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemCount, setItemCount] = useState();
  const [status, setStatus] = useState({});

  const onPageChangeHandler = (data) => {
    setCurrentPage(() => data.selected + 1);
    window.scroll(0, 650);
  };

  const statusHandler = (status) => {
    setStatus(status);
    status.message.includes("delete") && window.scroll(0, 550);
  };

  const getAllCarouselItems = () => {
    const response = axios
      .get(`http://127.0.0.1:8000/api/carouselDetails?page=${currentPage}`)
      .then((response) => {
        setItemCount(response.data.itemCount);
        setCarouselItems(response.data.itemList);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllCarouselItems();
  }, [currentPage]);

  return (
    <div className={classes.carousel_details}>
      <h2>Add new carousel post</h2>
      <AddNewCarouselItem
        getAllCarouselItems={getAllCarouselItems}
        statusHandler={statusHandler}
      />
      <p
        className={
          status?.status === "success"
            ? classes.carousel_details__success
            : classes.carousel_details__error
        }
      >
        {status?.message}
      </p>
      <hr />
      <UpdateCarouselList
        carouselItems={carouselItems}
        getAllCarouselItems={getAllCarouselItems}
        statusHandler={statusHandler}
      />
      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        breakLabel={"..."}
        pageCount={Math.ceil(itemCount / 4)}
        onPageChange={onPageChangeHandler}
        className={classes.pagination}
        activeClassName={classes.pagination_active}
        disabledClassName={classes.pagination_disable}
      />
    </div>
  );
};

export default CarouselDetails;
