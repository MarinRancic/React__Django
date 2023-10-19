import VetInfoItem from "./VetInfoItem";
import classes from "./VetInfoList.module.css";

const VetInfoList = (props) => {
  console.log(props.vetInfo);
  return (
    <div className={classes.vet_info_list}>
      {props.vetInfo?.length !== 0 ? (
        props.vetInfo?.map((index) => (
          <VetInfoItem
            key={index.id}
            name={index.name}
            address={index.address}
            workingHours={index.working_hours}
            contact={index.contact_number}
            iframe={index.iframe}
            opened={index.opened}
          />
        ))
      ) : (
        <p className={classes.no_items}>No Items To Display</p>
      )}
    </div>
  );
};

export default VetInfoList;
