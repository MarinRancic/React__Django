import classes from "./UsersListItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDonate,
  faShieldCat,
  faX,
  faEdit,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Switch } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import DeleteModal from "../../UI/Modals/DeleteModal";

const UserListItem = (props) => {
  const [username, setUsername] = useState(props.username);
  const [email, setEmail] = useState(props.email);
  const [address, setAddress] = useState(props.address);
  const [phone, setPhone] = useState(props.phone_number);
  const [role, setRole] = useState(props.role);
  const [verified, setVerified] = useState(props.verified);
  const [editable, setEditable] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  const navigate = useNavigate();
  const { authTokens, logoutUser } = useContext(AuthContext);

  const onChangeEditHandler = () => {
    setEditable(true);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const response = axios
      .put(
        `http://127.0.0.1:8000/api/userDetails/${props?.id}`,
        {
          username: username,
          email: email,
          address: address,
          phone_number: phone,
          role: role,
          verified: verified,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + String(authTokens.access),
          },
        }
      )
      .then((response) => {
        props.messageHandler({
          status: "success",
          message: "User successfully updated!",
        });
        setEditable(false);
        props.getAllUsers();
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

  const onDeleteHandler = () => {
    const response = axios
      .delete(`http://127.0.0.1:8000/api/userDetails/${props.id}`, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        props.getAllUsers();
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

  const cancelConfirmDeleteModal = () => {
    setConfirmDeleteModal(false);
  };

  const onToggleHandler = () => {
    verified ? setVerified(false) : setVerified(true);
  };

  const onRedirectToDonationsHandler = () => {
    navigate("/donationDetails", {state:props.username});
  };

  const onRedirectToRequestsHandler = () => {
    navigate("/waitingAdoption/requests", {state:props.email});
  };

  return (
    <tbody className={classes.user_list_item}>
      {confirmDeleteModal && (
        <DeleteModal
          cancelConfirmDeleteModal={cancelConfirmDeleteModal}
          onDeleteHandler={() => onDeleteHandler()}
        />
      )}
      <tr>
        <td>
          {props.has_donation && !editable ? (
            <FontAwesomeIcon
              icon={faDonate}
              className={classes.user_list__donate_icon}
              onClick={onRedirectToDonationsHandler}
            />
          ) : (
            ""
          )}
          <span className={classes.user_list_item__username}>
            {editable ? (
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            ) : (
              props.username
            )}
          </span>
          {props.has_adoption_request && !editable ? (
            <FontAwesomeIcon
              icon={faShieldCat}
              className={classes.user_list__adoption_icon}
              onClick={onRedirectToRequestsHandler}
            />
          ) : (
            ""
          )}
        </td>
        <td>
          {editable ? (
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          ) : (
            props.email
          )}{" "}
        </td>
        <td>
          {editable ? (
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          ) : (
            props.address
          )}{" "}
        </td>
        <td>
          {editable ? (
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          ) : (
            props.phone_number
          )}{" "}
        </td>
        <td className={classes.user_list_item__role}>
          {editable ? (
            <select
              defaultValue={role}
              onChange={(event) => {
                setRole(event.target.value);
              }}
            >
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          ) : (
            props.role
          )}{" "}
        </td>
        <td className={classes.user_list_item__verified}>
          <Switch
            checked={verified}
            onClick={onToggleHandler}
            disabled={editable ? false : true}
          />
        </td>
        <td className={classes.icons}>
          {editable ? (
            <FontAwesomeIcon
              icon={faCheck}
              className={classes.user_list_item__submit}
              size="lg"
              onClick={onSubmitHandler}
            />
          ) : (
            <FontAwesomeIcon
              icon={faEdit}
              className={classes.user_list_item__edit}
              size="lg"
              onClick={onChangeEditHandler}
            />
          )}

          <FontAwesomeIcon
            icon={faX}
            className={classes.user_list_item__delete}
            size="lg"
            onClick={() => {
              setConfirmDeleteModal(true);
            }}
          />
        </td>
      </tr>
    </tbody>
  );
};

export default UserListItem;
