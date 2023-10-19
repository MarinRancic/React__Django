import classes from "./Footer.module.css";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.copyright}>
        &copy;2022 Deseti Život | ALL RIGHTS RESERVED
      </div>

      <ul className={classes.socialMedia}>
        <li>
          <SocialIcon
            url="https://www.facebook.com/Deseti-%C5%BDivot-596005573774956"
            className={classes.icons}
          />
        </li>
        <li>
          <SocialIcon
            url="https://www.instagram.com/deseti_zivot_catrescue/"
            className={classes.icons}
          />
        </li>
        <li>
          <SocialIcon
            url="mailto:desetizivot@gmail.com"
            network="email"
            className={classes.icons}
          />
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
