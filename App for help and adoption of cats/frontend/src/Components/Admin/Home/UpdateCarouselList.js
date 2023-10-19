import classes from "./UpdateCarouselList.module.css";
import UpdateCarouselItem from "./UpdateCarouselItem";

const UpdateCarouselList = (props) => {

  return (
    <div className={classes.carousel_details_list}>
      {props.carouselItems
        ? props.carouselItems.map((index) => (
            <UpdateCarouselItem
              key={index.id}
              id={index.id}
              image={index.picture}
              text={index.text}
              isLink={index.is_link}
              linkUrl={index.link_url}
              position={index.position}
              getAllCarouselItems={props.getAllCarouselItems}
              statusHandler={props.statusHandler}
            />
          ))
        : <p>No Items To Display</p>}
    </div>
  );
};

export default UpdateCarouselList;
