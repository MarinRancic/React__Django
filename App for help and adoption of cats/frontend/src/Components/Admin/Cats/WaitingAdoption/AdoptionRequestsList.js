import classes from "./AdoptionRequestsList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import DeleteModal from "../../../UI/Modals/DeleteModal";
import { useContext, useState } from "react";
import AuthContext from "../../../Context/AuthContext";

const AdoptionRequestsList = (props) => {
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [id, setId] = useState();

  const { authTokens, logoutUser } = useContext(AuthContext);

  const getUserEmailById = (userId) => {
    const user = props.users.find((user) => user.id === userId);
    return user ? user.email : "";
  };

  const getUserPhoneById = (userId) => {
    const user = props.users.find((user) => user.id === userId);
    return user ? user.phone_number : "";
  };

  const getCatById = (catId) => {
    const cat = props.cats.find((cat) => cat.id === catId);
    return cat ? cat.name : "";
  };

  const onReadHandler = (id) => {
    const response = axios
      .put(
        `http://127.0.0.1:8000/api/adoptionRequest/${id}`,
        {
          status: "read",
        },
        {
          headers: {
            Authorization: "Bearer " + String(authTokens.access),
          },
        }
      )
      .then((response) => {
        props.getAllAdoptionRequests();
        props.messageHandler({
          status: "success",
          message: "Message changed to read!",
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          logoutUser(false);
        }
        props.statusHandler({
          status: "error",
          message: "Something went wrong!",
        });
      });
  };

  const onPendingHandler = (id) => {
    const response = axios
      .put(
        `http://127.0.0.1:8000/api/adoptionRequest/${id}`,
        {
          status: "pending",
        },
        {
          headers: {
            Authorization: "Bearer " + String(authTokens.access),
          },
        }
      )
      .then((response) => {
        props.getAllAdoptionRequests();
        props.messageHandler({
          status: "success",
          message: "Message changed to pending!",
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          logoutUser(false);
        }
        props.statusHandler({
          status: "error",
          message: "Something went wrong!",
        });
      });
  };

  const cancelConfirmDeleteModal = () => {
    setConfirmDeleteModal(false);
  };

  const onDeleteHandler = (id) => {
    const response = axios
      .delete(`http://127.0.0.1:8000/api/adoptionRequest/${id}`, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        props.getAllAdoptionRequests();
        props.messageHandler({
          status: "success",
          message: "You have successfully deleted an item!",
        });
        setConfirmDeleteModal(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          logoutUser(false);
        }
        props.statusHandler({
          status: "error",
          message: "Something went wrong!",
        });
      });
  };

  return (
    <div className={classes.adoption_requests_list}>
      {confirmDeleteModal && (
        <DeleteModal
          cancelConfirmDeleteModal={cancelConfirmDeleteModal}
          onDeleteHandler={() => onDeleteHandler(id)}
        />
      )}
      {props.adoptionRequests?.length !== 0 ? (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Cat</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          {props.adoptionRequests?.map((index) => (
            <tbody
              key={index.id}
              style={{
                backgroundColor:
                  index.status === "pending" ? "rgb(135, 206, 250)" : "",
              }}
            >
              <tr>
                <td>
                  {getUserEmailById(index.user)}
                  <br />
                  {getUserPhoneById(index.user)}
                </td>
                <td>{getCatById(index.cat)}</td>
                <td>{index.message}</td>
                <td className={classes.icons}>
                  {index.status !== "read" && (
                    <FontAwesomeIcon
                      onClick={() => onReadHandler(index.id)}
                      icon={faCheck}
                      size="xl"
                    />
                  )}
                  {index.status !== "pending" && (
                    <FontAwesomeIcon
                      onClick={() => onPendingHandler(index.id)}
                      icon={faEllipsisH}
                      size="xl"
                    />
                  )}
                  <FontAwesomeIcon
                    onClick={() => {
                      setConfirmDeleteModal(true);
                      setId(index.id);
                    }}
                    icon={faX}
                    size="xl"
                  />
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      ) : (
        <p className={classes.no_items}>No items to display</p>
      )}
    </div>
  );
};

export default AdoptionRequestsList;
