import ChangeWaitingAdoptionButton from "../../../Components/Admin/Cats/WaitingAdoption/ChangeWaitingAdoptionButton";
import WaitingAdoptionList from "../../../Components/Cats/WaitingAdoption/WaitingAdoptionList";
import classes from "./WaitingAdoption.module.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Search from "../../../Components/Utils/Search/Search";
import WaitingAdoptionRequestsButton from "../../../Components/Admin/Cats/WaitingAdoption/WaitingAdoptionRequestsButton";
import AuthContext from "../../../Components/Context/AuthContext";

const WaitingAdoption = () => {
  const [cats, setCats] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemCount, setItemCount] = useState();

  const { user } = useContext(AuthContext);

  const onPageChangeHandler = (data) => {
    setCurrentPage(() => data.selected + 1);
    window.scroll(0, 50);
  };

  const getWaitingCats = (text = "") => {
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

  useEffect(() => {
    getWaitingCats();
  }, [currentPage]);

  return (
    <div className={classes.waiting_adoption}>
      <div className={classes.waiting_adoption__buttons}>
        {user?.role === "admin" && <ChangeWaitingAdoptionButton />}
        {user?.role === "admin" && <WaitingAdoptionRequestsButton />}
      </div>
      <h2>Cats that are still waiting for an adoption</h2>
      <p>
        If you want to learn more about a specific cat or if you are interested
        in adopting, click on the respective cat's image for more information.
      </p>
      <Search getAllItems={getWaitingCats} />

      <WaitingAdoptionList cats={cats} />
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

export default WaitingAdoption;
