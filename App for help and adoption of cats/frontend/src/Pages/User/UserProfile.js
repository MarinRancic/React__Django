import { useContext, useEffect, useState } from "react";
import classes from "./UserProfile.module.css";
import axios from "axios";
import AuthContext from "../../Components/Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const UserProfile = () => {
  const [editable, setEditable] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [username, setUsername] = useState(userInfo?.username);
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState({});
  const { user, authTokens } = useContext(AuthContext);

  const onChangeEditHandler = () => {
    editable ? setEditable(false) : setEditable(true);
    setUsername(userInfo?.username);
    setEmail(userInfo?.email);
    setPhone(userInfo?.phone_number);
    setAddress(userInfo?.address);
  };

  const getUser = () => {
    const response = axios
      .get(`http://127.0.0.1:8000/api/userDetails/${user?.user_id}`)
      .then((response) => {
        console.log(response.data);
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmitHandler = () => {
    if (password.length < 7) {
      setMessage({ status: "error", text: "Password too small!" });
    } else if (newPassword && newPassword.length < 7) {
      setMessage({ status: "error", text: "New password is too small!" });
    } else {
      const response = axios
        .put(
          `http://127.0.0.1:8000/api/userDetails/${user?.user_id}`,
          {
            username: username,
            email: email,
            phone_number: phone,
            address: address,
            password_verify: password,
            password: newPassword,
          },
          {
            headers: {
              Authorization: "Bearer " + String(authTokens.access),
            },
          }
        )
        .then((response) => {
          console.log(response.log);
          setMessage({
            status: "success",
            text: "You have successfully edited your profile!",
          });
          getUser();
          setPassword("");
          setNewPassword("");
          setEditable(false);
        })
        .catch((error) => {
          console.log(error);
          error.response.status === 409
            ? setMessage({ status: "error", text: error.response.data })
            : setMessage({ status: "error", text: "Something went wrong" });
        });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={classes.user_profile}>
      <div className={classes.user_profile__card}>
        <h2 className={classes.user_profile__card__username}>
          {!editable ? (
            userInfo?.username
          ) : (
            <input
              type="text"
              placeholder="username"
              defaultValue={userInfo?.username}
              onChange={(event) => setUsername(event.target.value)}
            />
          )}
          {userInfo?.verified && !editable && (
            <FontAwesomeIcon
              icon={faCheckCircle}
              className={classes.user_profile__card__icon}
            />
          )}
        </h2>
        <span>
          {!editable ? (
            userInfo?.email
          ) : (
            <input
              type="email"
              placeholder="email"
              defaultValue={userInfo?.email}
              onChange={(event) => setEmail(event.target.value)}
            />
          )}
        </span>
        <span>
          {!editable ? (
            userInfo?.phone_number
          ) : (
            <input
              type="text"
              placeholder="phone number"
              defaultValue={userInfo?.phone_number}
              onChange={(event) => setPhone(event.target.value)}
            />
          )}
        </span>
        <span>
          {!editable ? (
            userInfo?.address
          ) : (
            <input
              type="text"
              defaultValue={userInfo?.address}
              placeholder="address"
              onChange={(event) => setAddress(event.target.value)}
            />
          )}
        </span>
        <span>
          {editable && (
            <input
              type="password"
              placeholder="new password (optional)"
              onChange={(event) => setNewPassword(event.target.value)}
            />
          )}
        </span>
        <span>
          {editable && (
            <input
              type="password"
              placeholder="enter password to submit"
              onChange={(event) => setPassword(event.target.value)}
            />
          )}
        </span>
        {!editable ? (
          <button onClick={onChangeEditHandler}>EDIT</button>
        ) : (
          <button onClick={onSubmitHandler}>SUBMIT</button>
        )}
        <div
          className={`${classes.auction_items__message} ${
            message?.status === "error"
              ? classes.auction_items__message__error
              : classes.auction_items__message__success
          }`}
        >
          {message?.text}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
