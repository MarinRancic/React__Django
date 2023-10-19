import AdoptedList from "../../../Components/Cats/Adopted/AdoptedList";
import ChangeAdoptedButton from "../../../Components/Admin/Cats/Adopted/ChangeAdoptedButton";
import classes from "./Adopted.module.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import ReactPaginate from "react-paginate";
import Search from "../../../Components/Utils/Search/Search";
import AuthContext from "../../../Components/Context/AuthContext";

const Adopted = () => {
  const [cats, setCats] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemCount, setItemCount] = useState();

  const {user} = useContext(AuthContext);

  const onPageChangeHandler = (data) => {
    setCurrentPage(() => data.selected + 1);
    window.scroll(0, 50);
  };

  const getAllAdopted = (text = "") => {
    const response = axios
      .get(
        `http://127.0.0.1:8000/api/catList?page=${currentPage}&name=${text}&status=adopted`
      )
      .then((response) => {
        setCats(response.data.itemList);
        setItemCount(response.data.itemCount);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllAdopted();
  }, [currentPage]);

  return (
    <div className={classes.adopted}>
      {user?.role === "admin" && <ChangeAdoptedButton />}
      <h2>All adopted cats</h2>
      <Search getAllItems={getAllAdopted} />
      <AdoptedList cats={cats} />
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

export default Adopted;
