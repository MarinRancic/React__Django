import classes from "./UpdateVeterinariansItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import DeleteModal from "../../UI/Modals/DeleteModal";
import AuthContext from "../../Context/AuthContext";

const UpdateVeterinariansItem = (props) => {
  const [name, setName] = useState(props.name);
  const [address, setAddress] = useState(props.address);
  const [contact, setContact] = useState(props.contact);
  const [iframe, setIframe] = useState(props.iframe);
  const [monday, setMonday] = useState(props.working_hours.monday);
  const [tuesday, setTuesday] = useState(props.working_hours.tuesday);
  const [wednesday, setWednesday] = useState(props.working_hours.wednesday);
  const [thursday, setThursday] = useState(props.working_hours.thursday);
  const [friday, setFriday] = useState(props.working_hours.friday);
  const [saturday, setSaturday] = useState(props.working_hours.saturday);
  const [sunday, setSunday] = useState(props.working_hours.sunday);
  const [status, setStatus] = useState({});
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  const {authTokens, logoutUser} = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const response = axios
      .put(
        `http://127.0.0.1:8000/api/veterinariansDetails/${props.id}`,
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
        setStatus({
          status: "success",
          message: "You have successfully updated a veterinarian!",
        });
        props.getAllVeterinarians();
      })
      .catch((error) => {
        console.log(error);
        if(error.response.status === 401){
          logoutUser(false);
        }
        setStatus({ status: "error", message: "Something went wrong!" });
      });
  };

  const cancelConfirmDeleteModal = () => {
    setConfirmDeleteModal(false);
  };

  const onDeleteHandler = () => {
    const response = axios
      .delete(`http://127.0.0.1:8000/api/veterinariansDetails/${props.id}`, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((resposne) => {
        props.getAllVeterinarians();
        props.statusHandler({
          status: "success",
          message: "You have successfully deleted an item!",
        });
      })
      .catch((error) => {
        console.log(error);
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
    <div className={classes.update_veterinarians_item}>
      {confirmDeleteModal && (
        <DeleteModal
          cancelConfirmDeleteModal={cancelConfirmDeleteModal}
          onDeleteHandler={onDeleteHandler}
        />
      )}
      <form onSubmit={onSubmitHandler}>
        <div className={classes.update_veterinarians_item_form}>
          <div className={classes.x}>
            <FontAwesomeIcon
              icon={faX}
              onClick={() => {
                setConfirmDeleteModal(true);
              }}
              size="2xl"
            />
          </div>
          <div className={classes.update_veterinarians_item_form_left}>
            <div>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                name="name"
                defaultValue={props.name}
                required
                onChange={(event) => setName(event.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="address">Address: </label>
              <input
                type="text"
                name="address"
                defaultValue={props.address}
                required
                onChange={(event) => setAddress(event.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="contact">Contact: </label>
              <input
                type="text"
                name="contact"
                defaultValue={props.contact}
                required
                onChange={(event) => setContact(event.target.value)}
              ></input>
            </div>
            <label id={classes.working_hours}>Working hours:</label>
            <ul>
              <label htmlFor="monday">Monday:</label>
              <input
                type="text"
                placeholder="00:00 - 24:00"
                name="monday"
                defaultValue={props.working_hours.monday}
                required
                onChange={(event) => setMonday(event.target.value)}
              ></input>
              <label htmlFor="tuesday">Tuesday:</label>
              <input
                type="text"
                placeholder="00:00 - 24:00"
                name="tuesday"
                defaultValue={props.working_hours.tuesday}
                required
                onChange={(event) => setTuesday(event.target.value)}
              ></input>
              <label htmlFor="wednesday">Wednesday:</label>
              <input
                type="text"
                placeholder="00:00 - 24:00"
                name="wednesday"
                defaultValue={props.working_hours.wednesday}
                required
                onChange={(event) => setWednesday(event.target.value)}
              ></input>
              <label htmlFor="thursday">Thursday:</label>
              <input
                type="text"
                placeholder="00:00 - 24:00"
                name="thursday"
                defaultValue={props.working_hours.thursday}
                required
                onChange={(event) => setThursday(event.target.value)}
              ></input>
              <label htmlFor="friday">Friday:</label>
              <input
                type="text"
                placeholder="00:00 - 24:00"
                name="friday"
                defaultValue={props.working_hours.friday}
                required
                onChange={(event) => setFriday(event.target.value)}
              ></input>
              <label htmlFor="saturday">Saturday:</label>
              <input
                type="text"
                placeholder="00:00 - 24:00"
                name="saturday"
                defaultValue={props.working_hours.saturday}
                required
                onChange={(event) => setSaturday(event.target.value)}
              ></input>
              <label htmlFor="sunday">Sunday:</label>
              <input
                type="text"
                placeholder="/"
                name="sunday"
                defaultValue={props.working_hours.sunday}
                required
                onChange={(event) => setSunday(event.target.value)}
              ></input>
            </ul>
          </div>
          <div className={classes.update_veterinarians_item_form_right}>
            <iframe src={props.iframe} />
            <div className={classes.update_veterinarians_item_form_right__iframe}>
              <label htmlFor="map">Iframe: </label>
              <textarea
                name="Iframe"
                defaultValue={props.iframe}
                required
                onChange={(event) => setIframe(event.target.value)}
              ></textarea>
            </div>
          </div>
          <button>UPDATE</button>
          <span
            className={
              status?.status === "success"
                ? classes.update_veterinarians_item__success
                : classes.update_veterinarians_item__error
            }
          >
            {status?.message}
          </span>
        </div>
      </form>
    </div>
  );
};

export default UpdateVeterinariansItem;
