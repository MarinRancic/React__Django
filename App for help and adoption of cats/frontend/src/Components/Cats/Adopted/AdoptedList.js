import classes from "./AdoptedList.module.css";
import AdoptedListItem from "./AdoptedListItem";

const AdoptedList = (props) => {
  return (
    <div className={classes.adopted_list}>
      {props.cats?.length !== 0 ? (
        props.cats?.map((index) => (
          <AdoptedListItem
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

export default AdoptedList;
