import classes from "./VetInfoItem.module.css";

const VetInfoItem = (props) => {
  

  return (
    <div className={classes.card}>
      {props.opened ? (
        <h1>OPEN!</h1>
      ) : (
        <h1 className={classes.closed}>CLOSED!</h1>
      )}
      <section>
        <p>
          <b>Name:</b> {props.name}
        </p>
        <p>
          <b>Address:</b> {props.address}
        </p>
        <b>Working hours:</b>
        <ul>
          <li>Monday: {props.workingHours.monday}</li>
          <li>Tuesday: {props.workingHours.tuesday}</li>
          <li>Wednesday: {props.workingHours.wednesday}</li>
          <li>Thursday: {props.workingHours.thursday}</li>
          <li>Friday: {props.workingHours.friday}</li>
          <li>Saturday: {props.workingHours.saturday}</li>
          <li>Sunday: {props.workingHours.sunday}</li>
        </ul>
        <p>
          <b>Contact: </b> <a href={"tel:" + props.contact}>{props.contact}</a>
        </p>
      </section>
      <iframe
        id="gmap_canvas"
        src={props.iframe}
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default VetInfoItem;
