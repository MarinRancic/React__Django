import classes from "./Veterinarians.module.css";
import VetInfoList from "../../Components/VetInfo/VetInfoList";
import VetInfo from "../../Components/VetInfo/VetInfo";
import ChangeVeterinariansInfoButton from "../../Components/Admin/Veterinarians/ChangeVeterinariansInfoButton";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Search from "../../Components/Utils/Search/Search";
import AuthContext from "../../Components/Context/AuthContext";

const Veterinarians = () => {
  const [vetInfo, setVetInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemCount, setItemCount] = useState();
  const [paginatedVets, setPaginatedVets] = useState();

  const { user } = useContext(AuthContext);

  const getAllVeterinarians = (text = "") => {
    const response = axios
      .get(`http://127.0.0.1:8000/api/veterinariansDetails?name=${text}`)
      .then((response) => {
        setVetInfo(response.data);
        setItemCount(response.data.length);
      })
      .catch((error) => console.log(error));
  };

  const paginateItems = () => {
    const startIndex = (currentPage - 1) * 4;
    const endIndex = startIndex + 4;
    setPaginatedVets(vetInfo.slice(startIndex, endIndex));
  };

  const onPageChangeHandler = (data) => {
    setCurrentPage(() => data.selected + 1);
    window.scroll(0, 450);
  };

  useEffect(() => {
    paginateItems();
  }, [currentPage, vetInfo]);

  useEffect(() => {
    getAllVeterinarians();
  }, []);

  const isOpened = (vetIndex) => {
    const regex = /\d+:\d+[ ,-]+\d+:\d+/g;
    const day = new Date()
      .toLocaleDateString("EN-en", { weekday: "long" })
      .toLocaleLowerCase();
    let timeNow = new Date();
    timeNow = timeNow.getHours() * 60 + timeNow.getMinutes();
    let start = 0;
    let start2 = 0;
    let end = 0;
    let end2 = 0;

    if (!regex.test(vetIndex.working_hours[day])) {
      vetIndex.opened = false;
      return;
    }
    const hours = vetIndex.working_hours[day].split("-");
    if (hours.length === 2) {
      start = +hours[0].split(":")[0] * 60 + +hours[0].split(":")[1];
      end = +hours[1].split(":")[0] * 60 + +hours[1].split(":")[1];
    } else {
      start = +hours[0].split(":")[0] * 60 + +hours[0].split(":")[1];

      end =
        +hours[1].split(",")[0].split(":")[0] * 60 +
        +hours[1].split(",")[0].split(":")[1];
      start2 =
        +hours[1].split(",")[1].split(":")[0] * 60 +
        +hours[1].split(",")[1].split(":")[1];
      end2 = +hours[2].split(":")[0] * 60 + +hours[2].split(":")[1];
    }
    if (
      (timeNow >= start && timeNow < end) ||
      (timeNow >= start2 && timeNow < end2)
    ) {
      vetIndex.opened = true;
    } else {
      vetIndex.opened = false;
    }
  };

  vetInfo.map((index) => {
    return isOpened(index);
  });
  vetInfo.sort((index) => {
    if (index.opened) {
      return -1;
    } else {
      return 1;
    }
  });

  return (
    <div className={classes.veterinarians}>
      {user?.role === "admin" && <ChangeVeterinariansInfoButton />}
      <VetInfo />
      <Search getAllItems={getAllVeterinarians} />
      <VetInfoList vetInfo={paginatedVets} />
      {vetInfo.length !== 0 ? (
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

export default Veterinarians;
