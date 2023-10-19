import classes from "./Header.module.css";
import logo from "./Images/desetiZivotLogo.png";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../Context/AuthContext";

const Header = () => {
  const [headerActive, setHeaderActive] = useState(false);
  const [hover, setHover] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);

  const onMouseEnterHandler = () => {
    setHover(true);
  };

  const onMouseLeaveHandler = () => {
    setHover(false);
  };

  const headerActiveHandler = () => {
    if (window.scrollY >= 50) {
      setHeaderActive(true);
    } else {
      setHeaderActive(false);
    }
  };
  window.addEventListener("scroll", headerActiveHandler);

  return (
    <header className={`${classes.header} ${headerActive && classes.scroll}`}>
      <NavLink to="/">
        <img src={logo} alt="logo" className={classes.logo} />
      </NavLink>

      <ul className={`${classes.links} ${headerActive && classes.scrollLinks}`}>
        {user?.role === "admin" && (
          <li>
            <NavLink
              className={(navData) =>
                navData.isActive
                  ? `${classes.active} ${classes.header__users}`
                  : classes.header__users
              }
              to="/users"
            >
              Users
            </NavLink>
          </li>
        )}
        {user?.role === "user" && (
          <li>
            <NavLink
              className={(navData) =>
                navData.isActive
                  ? `${classes.active} ${classes.header__users}`
                  : classes.header__users
              }
              to="/myProfile"
            >
              My Profile
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : "")}
            to="/veterinarians"
          >
            Veterinarians
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : "")}
            to="/auction"
          >
            Auction
          </NavLink>
        </li>
        <li
          className={classes.dropdown}
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
        >
          <NavLink to="/adopted">
            Cats <FontAwesomeIcon icon={faCaretDown} />
          </NavLink>
          {hover && (
            <ul className={classes.dropdown_menu}>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                  to="/adopted"
                >
                  Adopted
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                  to="/waitingAdoption"
                >
                  Waiting Adoption
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : "")}
            to="/donations"
          >
            Donations
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : "")}
            to="/contact"
          >
            Contact
          </NavLink>
        </li>
        <li>
          {user ? (
            <a className={classes.login} to="/login" onClick={logoutUser}>
              Logout
            </a>
          ) : (
            <NavLink className={classes.login} to="/login">
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </header>
  );
};

export default Header;
