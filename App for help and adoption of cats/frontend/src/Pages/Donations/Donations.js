import classes from "./Donations.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Paypal from "../../Components/Paypal/Paypal";
import DonationDetailsButton from "../../Components/Admin/Donations/DonationDetailsButton";
import { useContext } from "react";
import AuthContext from "../../Components/Context/AuthContext";

const Donations = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className={classes.donations}>
      {user?.role === "admin" && <DonationDetailsButton />}
      <div className={classes.donations__info}>
        <h1>Donations and why we need them</h1>
        <section>
          Every day, we receive calls from various people who find cats in need
          of help. <br />
          In addition to those requiring urgent assistance, we also have a large
          number of cats under our care. Your generous donations can directly
          contribute to the well-being and care of these cats, providing them
          with food, necessary medical procedures, and protection. Every
          contribution makes a significant impact in their lives.
          <br />
          <br />
          If you have any excess money, food, litter, canned food, treats, or
          anything else that can help our beloved furry friends, we would be
          extremely grateful for your support. Your contributions can make a
          significant difference in improving the lives of these precious
          animals.
          <div className={classes.donations__info__help__wraper}>
            <div className={classes.arrow}>
              <FontAwesomeIcon icon={faArrowDown} size="6x" />
            </div>
            <div className={classes.donations__info__help}>
              <b>
                We can't save all the cats on our own and we need your help!
              </b>

              <p>
                - With a donation of €14, we can feed street cats for 2 days.
              </p>
              <p>- With a donation of €50, we can spay/neuter 1 cat.</p>
              <p>- With a donation of €16, we can vaccinate 1 cat.</p>
            </div>
            <div className={classes.arrow}>
              <FontAwesomeIcon icon={faArrowDown} size="6x" />
            </div>
          </div>
        </section>
      </div>

      <div className={classes.donations__links}>
        <a href="https://paypal.me/desetizivot" target="popup">
          <div className={classes.donations__links__paypal}>
            <h2>PAYPAL</h2>
            <p>
              By clicking on this box, you can donate to us through the PayPal
              application.
              <br />
              If you don't have a PayPal account but still want to help, you can
              choose from other options!
              <br />
              If you prefer to manually send a donation via PayPal, you can use
              the following email address:
              <br />
              <b>desetizivot@gmail.com</b>
            </p>
          </div>
        </a>
        <div className={classes.donations__links__bank}>
          <h2>BANK</h2>
          <p>
            If you wish to transfer money to us via a bank account, here are our
            details:
            <br />
            <b>
              Name: Deseti Život
              <br />
              IBAN: HR7423600001102396278 <br />
              BIC/SWIFT: ZABAHR2X
            </b>
          </p>
        </div>
        <Paypal />
        <div className={classes.donations__links__address}>
          <p>
            In case you have excess cat food, litter, toys, blankets, carriers,
            or anything similar that can help us, or if you wish to purchase
            such items for us, you can either bring them in person or send them
            to the following address:
            <br />
            <b>
              Deseti Život
              <br />
              Table 25
              <br />
              21000 Split
            </b>
            <br />
            We sincerely appreciate your generosity and support in providing
            these much-needed supplies for our cause.
          </p>
        </div>
      </div>
      <div className={classes.donations__pictures}>
        <div className={classes.donations__picture1}></div>
        <div className={classes.donations__picture2}></div>
      </div>
      <div className={classes.donations__picture__text}>
        <p>
          In these pictures, you can see one of the largest donations we have
          ever received. Generous people from Germany extended their helping
          hand and sent us nearly a whole truck filled with wet and dry food,
          litter, powdered milk for little kittens, and many other items! With
          such a donation, the cats under our care and the stray cats were
          well-fed and supplied for a long time.
        </p>
      </div>
    </div>
  );
};

export default Donations;
