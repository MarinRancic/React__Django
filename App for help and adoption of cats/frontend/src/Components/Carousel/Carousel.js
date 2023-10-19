import classes from "./Carousel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import CarouselInfo from "./CarouselInfo";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState();

  const { authTokens } = useContext(AuthContext);
  const navigate = useNavigate();

  const pictureHandler = (index) => {
    setIndex(index);
  };

  const backwardsPictureHandler = () => {
    if (index === 0) {
      setIndex(data.data.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  const forwardsPictureHandler = () => {
    if (index === data.data.length - 1) {
      setIndex(0);
    } else {
      setIndex((prevState) => prevState + 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      forwardsPictureHandler();
    }, 7000);

    return () => {
      clearTimeout(timer);
    };
  });

  useEffect(() => {
    const response = axios
      .get("http://127.0.0.1:8000/api/carouselDetails")
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div
      className={classes.carousel}
      style={
        data
          ? {
              backgroundImage: `url(${
                "http://127.0.0.1:8000/api" + data.data[index].picture
              })`,
            }
          : {}
      }
    >
      <button className={classes.leftArrow} onClick={backwardsPictureHandler}>
        <FontAwesomeIcon icon={faArrowLeft} size="xl" />
      </button>
      <div className={classes.points}>
        {data
          ? data.data.map((_, pos) => {
              return (
                <button
                  key={pos}
                  className={index === pos ? classes.active : ""}
                  onClick={() => pictureHandler(pos)}
                ></button>
              );
            })
          : ""}
      </div>
      {data ? <CarouselInfo data={data.data[index]} /> : ""}

      <button className={classes.rightArrow} onClick={forwardsPictureHandler}>
        <FontAwesomeIcon icon={faArrowRight} size="xl" />
      </button>
    </div>
  );
};

export default Carousel;
