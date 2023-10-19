import { useEffect, useState } from "react";
import Search from "../../../Components/Utils/Search/Search";
import classes from "./Users.module.css";
import axios from "axios";
import ReactPaginate from "react-paginate";
import UsersList from "../../../Components/Admin/Users/UsersList";

const Users = () => {
  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemCount, setItemCount] = useState();
  const [message, setMessage] = useState({});

  const onPageChangeHandler = (data) => {
    setCurrentPage(() => data.selected + 1);
  };

  const messageHandler = (message) => {
    setMessage(message);
  };

  const getAllUsers = (text = "") => {
    const response = axios
      .get(`http://127.0.0.1:8000/api/users?text=${text}&page=${currentPage}`)
      .then((response) => {
        setUsers(response.data.itemList);
        setItemCount(response.data.itemCount);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllUsers();
  }, [currentPage]);

  return (
    <div className={classes.users}>
      <h2>Users</h2>
      <Search getAllItems={getAllUsers}/>
      <span
        className={
          message?.status === "success"
            ? classes.users__success
            : classes.users__error
        }
      >
        {message?.message}
      </span>
      <UsersList users={users} getAllUsers={getAllUsers} messageHandler={messageHandler}/>
      {users?.length !== 0 ? (
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

export default Users;
