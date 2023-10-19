import classes from "./WaitingAdoptionList.module.css";
import WaitingAdoptionListItem from "./WaitingAdoptionListItem";

const WaitingAdoptionList = (props) => {
  return (
    <div className={classes.waiting_adoption_list}>
      {props.cats?.length !== 0 ? (
        props.cats?.map((index) => (
          <WaitingAdoptionListItem
            key={index.id}
            id={index.id}
            name={index.name}
            status={index.status}
            info={index.info}
            picture={index.picture}
          />
        ))
      ) : (
        <p className={classes.no_items}>No items to display</p>
      )}
    </div>
  );
};

export default WaitingAdoptionList;
