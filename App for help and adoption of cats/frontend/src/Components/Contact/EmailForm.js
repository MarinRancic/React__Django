import classes from "./EmailForm.module.css";
import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../Context/AuthContext";

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("");

  const { user } = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let userEmail = user ? user.email : email;

    const response = axios
      .post("http://127.0.0.1:8000/api/contact", {
        email: userEmail,
        message: message,
        subject: subject,
      })
      .then((response) => {
        console.log(response);
        setEmail("");
        setMessage("");
        setSubject("");
        setStatus({
          status: "success",
          message: "You have successfully sent a message!",
        });
      })
      .catch((error) => {
        console.log(error);
        setStatus({ status: "error", message: "Something went wrong!" });
      });
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className={classes.email_form}>
        {!user ? (
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        ) : (
          ""
        )}
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          required
        />

        <div className={classes.email_form__message}>
          <textarea
            placeholder="Message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
          />
        </div>

        <button className={classes.email_form__submit}>SEND</button>
        <span
            className={
              status?.status === "success"
                ? classes.email_form__success
                : classes.email_form__error
            }
          >
            {status?.message}
          </span>
      </div>
    </form>
  );
};

export default EmailForm;
