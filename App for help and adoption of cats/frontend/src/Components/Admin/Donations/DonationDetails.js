import ReactPaginate from "react-paginate";
import Search from "../../Utils/Search/Search";
import classes from "./DonationDetails.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import DonationFilters from "./DonationFilters";
import DonationList from "./DonationList";
import { useLocation } from "react-router-dom";
import PieChart from "../../Utils/PieChart/PieChart";

const DonationDetails = () => {
  const params = useLocation();
  const [isInitialLoad, setIsInitialLoad] = useState(
    params?.state ? true : false
  );
  const [donations, setDonation] = useState();
  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemCount, setItemCount] = useState();
  const [donors, setDonors] = useState("all");

  const onPageChangeHandler = (data) => {
    setCurrentPage(() => data.selected + 1);
    window.scroll(0, 200);
  };

  const onDonorsChangeHandler = (value) => {
    setDonors(value);
  };

  const getAllDonations = (text = "") => {

    const response = axios
      .get(
        `http://127.0.0.1:8000/api/donations?donors=${donors}&page=${currentPage}&user_name=${text}&paypal_name=${text}`
      )
      .then((response) => {
        setDonation(response.data.itemList);
        setUsers(response.data.users);
        setItemCount(response.data.itemCount);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!isInitialLoad) {
      getAllDonations();
    }
  }, [currentPage, donors]);

  useEffect(() => {
    if (isInitialLoad) {
      getAllDonations(params.state);
      setIsInitialLoad(false);
    }
  }, []);

  return (
    <div className={classes.donation_details}>
      <h2>Donations</h2>
      {donors != "statistics" && <Search getAllItems={getAllDonations} text={params?.state} />}
      <DonationFilters
        onDonorsChangeHandler={onDonorsChangeHandler}
        donors={donors}
      />
      {donors !== "statistics" ? (
        <DonationList
          donations={donations}
          users={users}
          getAllDonations={getAllDonations}
          donors={donors}
        />
      ) : (
        <PieChart />
      )}
      {donations?.length !== 0 && donors !== "statistics" ? (
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

export default DonationDetails;
