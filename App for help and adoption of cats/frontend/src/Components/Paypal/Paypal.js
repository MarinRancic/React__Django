import classes from "./Paypal.module.css";
import { useContext, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";
import AuthContext from "../Context/AuthContext";

const Paypal = () => {
  const [donation, setDonation] = useState(1);
  const [currency, setCurrency] = useState("EUR");
  const [message, setMessage] = useState({});

  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className={classes.paypal}>
      <h2>EXPRESS PAYPAL DONATION</h2>
      <div className={classes.paypal__donation}>
        <label>Enter an amount (€) to donate:</label>
        <input
          type="number"
          min="1"
          value={donation}
          onChange={(e) => setDonation(e.target.value)}
        />
        {/* <select onChange={(e) => setCurrency(e.target.value)}>
          <option value="EUR">€</option>
          <option value="USD">$</option>
        </select> */}
      </div>
      <div className={classes.paypal__buttons}>
        <PayPalButton
          className={classes.paypalButton}
          style={{ layout: "horizontal", tagline: "false", color: "blue" }}
          options={{
            clientId:
              "AYKQlyuysWe-vx3uCyCzISSRk0YB2e5vJQZMEFqQjl3fMLp6yfSff_sZ_8a9DytN-z8LJdvKuhLgP__Y",
            currency: currency,
          }}
          amount={donation}
          onSuccess={(details) => {
            const user_id = user ? user.user_id : 2;
            const response = axios
              .post("http://127.0.0.1:8000/api/donations", {
                amount: donation,
                paypal: details.payer.name.given_name,
                user: user_id,
              })
              .then((response) => setMessage(response.data))
              .catch((error) => console.log(error));
          }}
        />
      </div>
      <span
        className={
          message?.status === "success"
            ? classes.paypal__success
            : classes.paypal__error
        }
      >
        {message?.message}
      </span>
    </div>
  );
};

export default Paypal;
