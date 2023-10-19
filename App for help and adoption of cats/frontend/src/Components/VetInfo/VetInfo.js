import classes from "./VetInfo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const VetInfo = () => {
  return (
    <div className={classes["vet-info"]}>
      <h1>Veterinarians</h1>
      <section>
        <FontAwesomeIcon size="xl" icon={faTriangleExclamation} />
        In case of need, here are the veterinary clinics in the city of Split.
        If you come across an injured animal or if your pet needs veterinary
        care, we kindly ask you to take them to the nearest clinic as soon as
        possible to receive the necessary professional medical assistance.
        <FontAwesomeIcon size="xl" icon={faTriangleExclamation} />
      </section>
    </div>
  );
};

export default VetInfo;
