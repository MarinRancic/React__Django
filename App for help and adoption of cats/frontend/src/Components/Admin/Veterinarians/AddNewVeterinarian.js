import classes from "./AddNewVeterinarian.module.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";

const AddNewVeterinarian = (props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [iframe, setIframe] = useState("");
  const [monday, setMonday] = useState("");
  const [tuesday, setTuesday] = useState("");
  const [wednesday, setWednesday] = useState("");
  const [thursday, setThursday] = useState("");
  const [friday, setFriday] = useState("");
  const [saturday, setSaturday] = useState("");
  const [sunday, setSunday] = useState("");

  const {authTokens, logoutUser} = useContext(AuthContext);

  const onSuccess = () => {
    setName("");
    setAddress("");
    setContact("");
    setIframe("");
    setMonday("");
    setTuesday("");
    setWednesday("");
    setThursday("");
    setFriday("");
    setSaturday("");
    setSunday("");
    props.getAllVeterinarians();
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const response = axios
      .post(
        "http://127.0.0.1:8000/api/veterinariansDetails",
        {
          name: name,
          address: address,
          contact_number: contact,
          iframe: iframe,
          working_hours: {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday,
            sunday: sunday,
          },
        },
        {
          headers: {
            Authorization: "Bearer " + String(authTokens.access),
          },
        }
      )
      .then((response) => {
        props.statusHandler({
          status: "success",
          message: "You have successfully added a new veterinarian!",
        });
        onSuccess();
      })
      .catch((error) => {
        if(error.response.status === 401){
          logoutUser(false);
        }
        props.statusHandler({
          status: "error",
          message: "Something went wrong!",
        });
      });
  };

  return (
    <div className={classes.add_new_veterinarian}>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.add_new_veterinarian_form}>
          <div className={classes.add_new_veterinarian_form_left}>
            <div>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                name="name"
                value={name}
                required
                onChange={(event) => setName(event.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="address">Address: </label>
              <input
                type="text"
                name="address"
                value={address}
                required
                onChange={(event) => setAddress(event.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="contact">Contact: </label>
              <input
                type="text"
                name="contact"
                value={contact}
                required
                onChange={(event) => setContact(event.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="map">*Iframe: </label>
              <textarea
                name="Iframe"
                value={iframe}
                required
                onChange={(event) => setIframe(event.target.value)}
              ></textarea>
            </div>
            <p>
              *In Iframe field copy text between quotes from{" "}
              <a href="https://www.google.com/maps">Google maps </a>
              Simply, open google maps, click on the location that you <br />{" "}
              want to add, press share button, "Embed a map" tab and <br /> copy
              ONLY src part.
            </p>
          </div>

          <div className={classes.add_new_veterinarian_form_right}>
            <label>Working hours:</label>
            <ul>
              <label htmlFor="monday">Monday:</label>
              <input
                type="text"
                placeholder="00:00 - 24:00"
                name="monday"
                value={monday}
                required
                onChange={(event) => setMonday(event.target.value)}
              ></input>
              <label htmlFor="tuesday">Tuesday:</label>
              <input
                type="text"
                placeholder="00:00 - 24:00"
                name="tuesday"
                value={tuesday}
                required
                onChange={(event) => setTuesday(event.target.value)}
              ></input>
              <label htmlFor="wednesday">Wednesday:</label>
              <input
                type="text"
                placeholder="00:00 - 24:00"
                name="wednesday"
                value={wednesday}
                required
                onChange={(event) => setWednesday(event.target.value)}
              ></input>
              <label htmlFor="thursday">Thursday:</label>
              <input
                type="text"
                placeholder="00:00 - 24:00"
                name="thursday"
                value={thursday}
                required
                onChange={(event) => setThursday(event.target.value)}
              ></input>
              <label htmlFor="friday">Friday:</label>
              <input
                type="text"
                placeholder="00:00 - 24:00"
                name="friday"
                value={friday}
                required
                onChange={(event) => setFriday(event.target.value)}
              ></input>
              <label htmlFor="saturday">Saturday:</label>
              <input
                type="text"
                placeholder="00:00 - 24:00"
                name="saturday"
                value={saturday}
                required
                onChange={(event) => setSaturday(event.target.value)}
              ></input>
              <label htmlFor="sunday">Sunday:</label>
              <input
                type="text"
                placeholder="/"
                name="sunday"
                value={sunday}
                required
                onChange={(event) => setSunday(event.target.value)}
              ></input>
            </ul>
          </div>
          <button>ADD</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewVeterinarian;
