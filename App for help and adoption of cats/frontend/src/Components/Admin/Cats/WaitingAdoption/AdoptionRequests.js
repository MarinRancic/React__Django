import classes from "./AdoptionRequests.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import AdoptionRequestsList from "./AdoptionRequestsList";
import Search from "../../../Utils/Search/Search";
import ReactPaginate from "react-paginate";
import AdoptionRequestsFilters from "./AdoptionRequestsFilters";
import { useLocation } from "react-router-dom";

const AdoptionRequests = () => {
  const params = useLocation();
  const [isInitialLoad, setIsInitialLoad] = useState(
    params?.state ? true : false
  );
  const [adoptionRequests, setAdoptionRequests] = useState();
  const [cats, setCats] = useState();
  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemCount, setItemCount] = useState();
  const [status, setStatus] = useState(params.state ? "all" : "pending");
  const [message, setMessage] = useState({});

  const onPageChangeHandler = (data) => {
    setCurrentPage(() => data.selected + 1);
    window.scroll(0, 200);
  };

  const onStatusChangeHandler = (value) => {
    setStatus(value);
  };

  const messageHandler = (message) => {
    setMessage(message);
    message.message.includes("delete") && window.scroll(0, 150);
  };

  const getAllAdoptionRequests = (text = "") => {
    const response = axios
      .get(
        `http://127.0.0.1:8000/api/adoptionRequest?status=${status}&page=${currentPage}&cat_name=${text}&user_email=${text}`
      )
      .then((response) => {
        setAdoptionRequests(response.data.itemList);
        setCats(response.data.cats);
        setUsers(response.data.users);
        setItemCount(response.data.itemCount);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!isInitialLoad) {
      getAllAdoptionRequests();
      setMessage({});
    }
  }, [currentPage, status]);

  useEffect(() => {
    if (isInitialLoad) {
      getAllAdoptionRequests(params.state);
      setIsInitialLoad(false);
    }
  }, []);

  return (
    <div className={classes.adoption_request}>
      <h2>Adoption Requests</h2>
      <Search getAllItems={getAllAdoptionRequests} text={params?.state} />
      <span
        className={
          message?.status === "success"
            ? classes.adoption_request__success
            : classes.adoption_request__error
        }
      >
        {message?.message}
      </span>
      <AdoptionRequestsFilters
        onStatusChangeHandler={onStatusChangeHandler}
        status={status}
      />
      <AdoptionRequestsList
        adoptionRequests={adoptionRequests}
        users={users}
        cats={cats}
        getAllAdoptionRequests={getAllAdoptionRequests}
        messageHandler={messageHandler}
      />
      {adoptionRequests?.length !== 0 ? (
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          pageCount={Math.ceil(itemCount / 10)}
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

export default AdoptionRequests;
