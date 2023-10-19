import EmailForm from "../../Components/Contact/EmailForm";
import classes from "./Contact.module.css";

const Contact = () => {
  return <div className={classes.contact}>
    <h2>Contact us</h2>
    <p>
      If you have any questions for us, feel free to ask! <br />
      Also, any suggestions, ideas and tips for impoving our community is more than welcome!
    </p>
    <EmailForm />
  </div>;
};

export default Contact;
