import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "./Login.module.css";
import AuthContext from "../Context/AuthContext";

const Login = () => {
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  useEffect(() => {
    setErrorMessage(location.state?.message);
  }, [location.state?.message]);

  const onRedirectToHomeHandler = () => {
    navigate("/");
  };

  const onRedirectToRegistrationHandler = () => {
    navigate("/registration");
  };

  const onRedirectToForgotPassword = () => {
    navigate("/password_reset");
  };

  return (
    <div className={classes.login}>
      <div className={classes.login__card}>
        <h1>LOGIN</h1>

        <form onSubmit={loginUser}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
          ></input>
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          ></input>
          <span onClick={onRedirectToForgotPassword}>I forgot my password</span>
          <button type="submit">Login</button>
        </form>

        <div className={classes.login__card__error}>
          {errorMessage &&
            (errorMessage.includes("success") ? (
              <h3 className={classes.success}>{errorMessage}</h3>
            ) : (
              <h3>{errorMessage}</h3>
            ))}
        </div>
        <div className={classes.login__card__info}>
          <h3>
            <b>Don't have an account?</b> <br />
            <span onClick={onRedirectToRegistrationHandler}>
              Click to Register!
            </span>
            <p>or</p>
            <span onClick={onRedirectToHomeHandler}>Continue as a Guest</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
