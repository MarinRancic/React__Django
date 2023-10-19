import classes from "./WaitingAdoptionDetailsList.module.css";
import WaitingAdoptionDetailsListItem from "./WaitingAdoptionDetailsListItem";

const WaitingAdoptionDetailsList = (props) => {
  return (
    <div className={classes.waiting_adoption_details_list}>
      {props.cats?.length !== 0 ? (
        props.cats?.map((index) => (
          <WaitingAdoptionDetailsListItem
            key={index.id}
            id={index.id}
            name={index.name}
            status={index.status}
            info={index.info}
            picture={index.picture}
            getAllWaiting={props.getAllWaiting}
            messageHandler={props.messageHandler}
          />
        ))
      ) : (
        <p className={classes.no_items}>No items to display</p>
      )}
    </div>
  );
};

export default WaitingAdoptionDetailsList;
