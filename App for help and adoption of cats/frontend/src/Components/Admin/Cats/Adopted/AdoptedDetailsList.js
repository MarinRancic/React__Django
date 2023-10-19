import classes from "./AdoptedDetailsList.module.css";
import AdoptedDetailsListItem from "./AdoptedDetailsListItem";

const AdoptedDetailsList = (props) => {
  return (
    <div className={classes.adopted_details_list}>
      {props.cats?.length !== 0 ? (
        props.cats?.map((index) => (
          <AdoptedDetailsListItem
            key={index.id}
            id={index.id}
            name={index.name}
            status={index.status}
            info={index.info}
            picture={index.picture}
            getAllAdopted={props.getAllAdopted}
            messageHandler={props.messageHandler}
          />
        ))
      ) : (
        <p className={classes.no_items}>No items to display</p>
      )}
    </div>
  );
};

export default AdoptedDetailsList;
