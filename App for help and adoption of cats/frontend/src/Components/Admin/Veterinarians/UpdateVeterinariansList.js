import UpdateVeterinariansItem from "./UpdateVeterinariansItem";
import classes from "./UpdateVeterinariansList.module.css";
import { useState, useEffect } from "react";

const UpdateVeterinariansList = (props) => {
  return (
    <div className={classes.update_veterinarians_list}>
      {props.veterinarians ? (
        props.veterinarians.map((index) => (
          <UpdateVeterinariansItem
            key={index.id}
            id={index.id}
            name={index.name}
            address={index.address}
            contact={index.contact_number}
            working_hours={index.working_hours}
            iframe={index.iframe}
            getAllVeterinarians={props.getAllVeterinarians}
            statusHandler={props.statusHandler}
          />
        ))
      ) : (
        <p>No Items To Display</p>
      )}
    </div>
  );
};

export default UpdateVeterinariansList;
