import classes from "./Registration.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const OnSubmitHandler = (event) => {
    event.preventDefault();
    setErrorMessage("");
    if (username.length < 3) {
      setErrorMessage("Username too short!");
    } else if (username.length > 26) {
      setErrorMessage("Username too long!");
    } else if (password.length < 6) {
      setErrorMessage("Password too short!");
    } else if (password.length > 26) {
      setErrorMessage("Password too long!");
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
    } else {
      const response = axios
        .post("http://127.0.0.1:8000/api/users", {
          username: username,
          email: email,
          password: password,
          phone_number: phone,
          address: address,
          role: "user",
        })
        .then((response) => {
          setSuccess(true);
          console.log(response);

          navigate("/login", {
            state: { message: "You have successfully registered!" },
            replace: true,
          });
        })
        .catch((error) => {
          if (!error?.response) {
            setErrorMessage("Something went wrong, please try again later.");
          } else if (error.response?.data === "username_error") {
            setErrorMessage("Username is already used!");
          } else if (error.response?.data === "email_error") {
            setErrorMessage("Email is already used!");
          }
        });
    }
  };

  const onRedirectToHomeHandler = () => {
    navigate("/");
  }

  const onRedirectToLoginHandler = () => {
    navigate("/login");
  }

  return (
    <div className={classes.registration}>
      <div className={classes.registration__card}>
        <h1>REGISTRATION</h1>

        <form onSubmit={OnSubmitHandler}>
          <input
            type="text"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
            required
          ></input>
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
            required
          ></input>
          <input
            type="text"
            placeholder="0912345678"
            onChange={(event) => setPhone(event.target.value)}
            required
          ></input>
          <input
            type="text"
            placeholder="Put Skalica 7, 21000 Split"
            onChange={(event) => setAddress(event.target.value)}
            required
          ></input>
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            required
          ></input>
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          ></input>
          <button type="submit">Register</button>
        </form>

        <div className={classes.registration__card__error}>
          {errorMessage && <h3>{errorMessage}</h3>}
        </div>
        <div className={classes.registration__card__info}>
          <h3>
            <b>Already have an account?</b> <br />
            <span onClick={onRedirectToLoginHandler}> Click to Login!</span>
            <p>or</p>
            <span onClick={onRedirectToHomeHandler}>Continue as a Guest</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Registration;
