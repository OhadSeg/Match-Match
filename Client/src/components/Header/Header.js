import styles from "./Header.module.css";
import PersonIcon from "@mui/icons-material/Person";
import ForumIcon from "@mui/icons-material/Forum";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import { UsersContext } from "../../store/usersContext";
import { useContext } from "react";

function Header({ backButtonPath }) {
  const { isLoggedIn } = useContext(UsersContext)
  const headerClasses = [styles.header];

  if (isLoggedIn) {
    headerClasses.push(styles.loggedIn);
  }
  return (
    <div className={headerClasses.join(' ')}>
      {isLoggedIn ? backButtonPath ? (
        <Link to={backButtonPath}>
          <IconButton>
            <ArrowBackIosIcon className={styles.header__icon} fontSize="large" />
          </IconButton>
        </Link> 
      ) : (
        <Link to={"/profile"}>
        <IconButton>
          <PersonIcon className={styles.header__icon} fontSize="large" />
        </IconButton>
        </Link>
      ) : null}
      <Link to="/">
        <img className={styles.header__logo}
          src="/img/match-match-logo.png"
          alt="tinder logo"
        />
      </Link>
      {isLoggedIn && <Link to="/chat">
        <IconButton>
          <ForumIcon className={styles.header__icon} fontSize="large" />
        </IconButton>
      </Link>}
    </div> 
  );
}

export default Header;
