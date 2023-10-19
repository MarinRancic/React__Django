import classes from "./Home.module.css";
import Carousel from "../../Components/Carousel/Carousel";
import React, { useContext, useEffect } from "react";
import ChangeCarouselInfoButton from "../../Components/Admin/Home/ChangeCarouselInfoButton";
import AuthContext from "../../Components/Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    return navigate("/contact");
  };

  return (
    <>
      <div className={classes.carousel}>
        {user?.role === "admin" && <ChangeCarouselInfoButton />}
        <Carousel />
      </div>
      <div className={classes.home}>
        <h1>Who are we?</h1>
        <section>
          <strong>
            We are a nonprofit organization called "Deseti Život" (Tenth Life)
            with a mission to help all stray cats in need of assistance.
          </strong>
          <br />
          <br />
          We are a volunteer association dedicated to the welfare of animals,
          with a heartfelt mission to rescue stray cats in Split and provide
          them with a beautiful new life.
          <br />
        </section>
        <h1>Why are we called Deseti Život? (Tenth Life)</h1>
        <section>
          Most of us have heard the saying that cats have nine lives. It
          originated mainly due to the special character that cats possess –
          they are lively and cheerful animals that love to play, run, jump, and
          climb. As a result, they often find themselves in situations where
          they experience free falls, but they typically manage to land on their
          feet. Unfortunately, some cats can be a bit careless and end up
          injuring themselves while playing or crossing the road without
          caution. Additionally, they may encounter cruel individuals who harm
          them. Cats can also get into conflicts with other cats, resulting in
          injuries. Many of these cats require urgent surgery or vaccinations
          for various diseases, as without them, they wouldn't be able to
          survive. There are also cats that are not injured but still need
          someone to remove them from dangerous streets and provide them with
          the warmth of a home and all the love they deserve.
          <br />
          <br />
          <strong>
            That's where we come in – the organization, but especially you –
            dear people, full of love for our beloved furry companions, to whom
            we provide their much-needed and well-deserved Tenth Life!
            <br />
            Our goal is to help such cats and to draw the attention of others to
            do the same, encouraging them to join us in rescuing and assisting
            these precious creatures.
          </strong>
        </section>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            className={classes.svg}
            fill="#bb547f"
            d="M0,256L40,218.7C80,181,160,107,240,101.3C320,96,400,160,480,202.7C560,245,640,267,720,234.7C800,203,880,117,960,101.3C1040,85,1120,139,1200,160C1280,181,1360,171,1400,165.3L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className={classes.shelter}>
        <div className={classes.shelter__card}>
          <div className={classes.shelter__pic} />
          <div className={classes.shelter__text}>
            <p>
              Creative and skilled individuals have succeeded in creating
              shelters that protect cats from rain and provide them with a
              refuge. These shelters have been serving several generations of
              cats for shelter purposes. The shelters are also lined with
              blankets and various items to make them more comfortable for the
              cats, especially during winter days.
            </p>
            <p>
              If you are talented and have the time and willingness to create
              something like this or if you have surplus similar items that can
              help outdoor cats, we kindly ask you to assist the cats in your
              neighborhood or reach out to us, and we will ensure that your
              contributions enhance their lives.
            </p>
            <button onClick={onClickHandler}>Contact</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
