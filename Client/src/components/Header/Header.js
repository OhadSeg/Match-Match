import styles from "./Header.module.css";
import PersonIcon from "@mui/icons-material/Person";
import ForumIcon from "@mui/icons-material/Forum";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import AuthContext from '../../store/auth-context'
import { useContext } from "react";

function Header({ backButtonPath }) {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.isLoggedIn)
  const headerClasses = [styles.header];

  if (authCtx.isLoggedIn) {
    headerClasses.push(styles.loggedIn);
  }
  return (
    <div className={headerClasses.join(' ')}>
      {authCtx.isLoggedIn ? backButtonPath ? (
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
      {authCtx.isLoggedIn && <Link to="/chat">
        <IconButton>
          <ForumIcon className={styles.header__icon} fontSize="large" />
        </IconButton>
      </Link>}
    </div> 
  );
}

export default Header;
