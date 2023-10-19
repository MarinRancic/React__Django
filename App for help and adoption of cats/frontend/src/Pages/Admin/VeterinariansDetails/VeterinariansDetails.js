import classes from "./VeterinariansDetails.module.css";
import axios from "axios";
import AddNewVeterinarian from "../../../Components/Admin/Veterinarians/AddNewVeterinarian";
import UpdateVeterinariansList from "../../../Components/Admin/Veterinarians/UpdateVeterinariansList";
import { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import AuthContext from "../../../Components/Context/AuthContext";

const VeterinariansDetails = () => {
  const [veterinarians, setVeterinarians] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemCount, setItemCount] = useState();
  const [status, setStatus] = useState({});

  const { authTokens } = useContext(AuthContext);

  const onPageChangeHandler = (data) => {
    setCurrentPage(() => data.selected + 1);
    window.scroll(0, 650);
  };

  const statusHandler = (status) => {
    setStatus(status);
    status.message.includes("delete") && window.scroll(0, 550);
  };

  const getAllVeterinarians = () => {
    const response = axios
      .get(`http://127.0.0.1:8000/api/veterinariansDetails?page=${currentPage}`)
      .then((response) => {
        setItemCount(response.data.itemCount);
        setVeterinarians(response.data.itemList);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllVeterinarians();
  }, [currentPage]);

  return (
    <div className={classes.veterinarians_details}>
      <h2>Add new veterinarian</h2>
      <AddNewVeterinarian
        getAllVeterinarians={getAllVeterinarians}
        statusHandler={statusHandler}
      />
      <p
        className={
          status?.status === "success"
            ? classes.veterinarians_details__success
            : classes.veterinarians_details__error
        }
      >
        {status?.message}
      </p>
      <hr />
      <UpdateVeterinariansList
        veterinarians={veterinarians}
        getAllVeterinarians={getAllVeterinarians}
        statusHandler={statusHandler}
      />
      {veterinarians.length !== 0 ? (
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
      ) : (
        ""
      )}
    </div>
  );
};

export default VeterinariansDetails;
