import classes from "./PasswordReset.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import {useCookies} from "react-cookie";

const PasswordReset = () => {
  const [email, setEmail] = useState();
  const [status, setStatus] = useState();
  const [cookies, setCookie] = useCookies(['user_id']);
  
  const navigate = useNavigate();

  const onResetHandler = (event) => {
    event.preventDefault();

    const response = axios
      .post("http://127.0.0.1:8000/api/passwordReset", { email: email }, {withCredentials:true})
      .then((response) => {
        console.log(response.data);
        setCookie('user_id', response.data.user_id, { maxAge: 600 });
        setCookie('token', response.data.token, { maxAge: 600 });
        setStatus({
          status: "success",
          message:
            "Reset successful! Check your email for further instructions",
        });
      })
      .catch((error) => {
        console.log(error);
        setStatus({
          status: "error",
          message: "There is no user with that email!",
        });
      });
  };

  const onRedirectToLoginHandler = () => {
    navigate("/login");
  };

  const onRedirectToHomeHandler = () => {
    navigate("/");
  };

  return (
    <div className={classes.password_reset}>
      <div className={classes.password_reset__card}>
        <h1>PASSWORD RESET</h1>

        <form onSubmit={onResetHandler}>
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          ></input>
          <button type="submit">Reset</button>
        </form>

        {status ? <h3
          className={
            status?.status === "error"
              ? classes.password_reset__card__error
              : classes.password_reset__card__success
          }
        >
          {status?.message}
        </h3> : ""}

        <div className={classes.password_reset__card__info}>
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

export default PasswordReset;
