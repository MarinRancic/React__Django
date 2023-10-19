import classes from "./PasswordResetConfirm.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

const PasswordResetConfirm = () => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [status, setStatus] = useState();
  const { token } = useParams();
  const [cookies] = useCookies();

  const navigate = useNavigate();

  const onResetHandler = (event) => {
    event.preventDefault();

    if (password.length <= 6) {
      setStatus({
        status: "error",
        message: "Password is too short",
      });
    } else if (password === confirmPassword) {
      const response = axios
        .put(`http://127.0.0.1:8000/api/passwordResetConfirm/${token}`, {
          password: password,
          user_id: cookies.user_id,
          token: cookies.token,
        })
        .then((response) => {
          console.log(response);
          navigate("/login", {
            state: {
              status: "success",
              message: "You have successfully reset your password!",
            },
          });
        })
        .catch((error) => {
          console.log(error);
          setStatus({
            status: "error",
            message: "Wrong credentials!",
          });
        });
    } else {
      setStatus({
        status: "error",
        message: "Passwords did not match",
      });
    }
  };

  const onRedirectToLoginHandler = () => {
    navigate("/login");
  };

  const onRedirectToHomeHandler = () => {
    navigate("/");
  };

  return (
    <div className={classes.password_reset_confirm}>
      <div className={classes.password_reset_confirm__card}>
        <h1>CONFIRM RESET</h1>

        <form onSubmit={onResetHandler}>
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
          <input
            type="password"
            placeholder="Confirm Password"
            required
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          ></input>
          <button type="submit">Reset</button>
        </form>

        {status ? (
          <h3
            className={
              status?.status === "error"
                ? classes.password_reset_confirm__card__error
                : classes.password_reset_confirm__card__success
            }
          >
            {status?.message}
          </h3>
        ) : (
          ""
        )}

        <div className={classes.password_reset_confirm__card__info}>
          <h3>
            <span onClick={onRedirectToLoginHandler}>Back to Login</span>
            <p>or</p>
            <span onClick={onRedirectToHomeHandler}>Continue as a Guest</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetConfirm;
