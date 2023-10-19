import { useNavigate } from "react-router-dom";
import classes from "./AdoptedDetailsListItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useContext, useState } from "react";
import DeleteModal from "../../../UI/Modals/DeleteModal";
import AuthContext from "../../../Context/AuthContext";

const AdoptedDetailsListItem = (props) => {
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  const {authTokens, logoutUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`${props.id}`);
  };

  const cancelConfirmDeleteModal = () => {
    setConfirmDeleteModal(false);
  };

  const onDeleteHandler = () => {
    const response = axios
      .delete(`http://127.0.0.1:8000/api/catList/${props?.id}`, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        props.getAllAdopted();
        props.messageHandler({
          status: "success",
          message: "You have successfully deleted an item!",
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          logoutUser(false);
        }
        props.messageHandler({
          status: "error",
          message: "Something went wrong!",
        });
      });
  };

  return (
    <div className={classes.adopted_details_list_item}>
      {confirmDeleteModal && (
        <DeleteModal
          cancelConfirmDeleteModal={cancelConfirmDeleteModal}
          onDeleteHandler={onDeleteHandler}
        />
      )}
      <div className={classes.x}>
        <FontAwesomeIcon
          icon={faX}
          onClick={() => {
            setConfirmDeleteModal(true);
          }}
          size="m"
        />
      </div>
      <div className={classes.adopted_details_list_item__name}>
        {props.name}
      </div>
      <div className={classes.adopted_details_list_item__picture}>
        <img
          onClick={onClickHandler}
          src={"http://127.0.0.1:8000/api" + props.picture}
          alt="Error"
        />
      </div>
    </div>
  );
};
export default AdoptedDetailsListItem;
