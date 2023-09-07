import React, {
  useState,
  useReducer,
  useRef,
  useEffect,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from './profile.png'
import Card from "../../components/UI/Card/Card";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./SignUp.module.css";
import instance from "../../rest-utils"

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const textReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length >= 1 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length >= 1 };
  }
  return { value: "", isValid: false };
};

const SignUp = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [firstNameState, dispatchFirstName] = useReducer(textReducer, {
    value: "",
    isValid: null,
  });
  const [lastNameState, dispatchLastName] = useReducer(textReducer, {
    value: "",
    isValid: null,
  });
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [hobbyState, dispatchHobby] = useReducer(textReducer, {
    value: "",
    isValid: null,
  });
  const [favoriteFoodState, dispatchFavoriteFood] = useReducer(textReducer, {
    value: "",
    isValid: null,
  });
  const [musicTypeState, dispatchMusicType] = useReducer(textReducer, {
    value: "",
    isValid: null,
  });
  const [songsState, dispatchSongs] = useReducer(textReducer, {
    value: "",
    isValid: null,
  });
  const [bookState, dispatchBook] = useReducer(textReducer, {
    value: "",
    isValid: null,
  });
  const [moviesState, dispatchMovies] = useReducer(textReducer, {
    value: "",
    isValid: null,
  });
  const [vacationSpotState, dispatchVacationSpot] = useReducer(textReducer, {
    value: "",
    isValid: null,
  });
  const [ageState, dispatchAge] = useReducer(textReducer, {
    value: "",
    isValid: null,
  });
  const [genderState, dispatchGender] = useReducer(textReducer, {
    value: "",
    isValid: null,
  });
  const [residenceState, dispatchResidence] = useReducer(textReducer, {
    value: "",
    isValid: null,
  });
  const [interested_inState, dispatchInterested_in] = useReducer(textReducer, {
    value: "",
    isValid: null,
  });

  const [postImage, setPostImage] = useState("")


  const navigate = useNavigate();

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { isValid: firstNameIsValid } = firstNameState;
  const { isValid: lastNameIsValid } = lastNameState;
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const { isValid: hobbyStateIsValid } = hobbyState;
  const { isValid: favoriteFoodStateIsValid } = musicTypeState;
  const { isValid: musicTypeStateIsValid } = passwordState;
  const { isValid: vacationSpotStateIsValid } = vacationSpotState;
  const { isValid: ageIsValid } = ageState;
  const { isValid: genderIsValid } = genderState;
  const { isValid: residenceIsValid } = residenceState;
  const { isValid: interested_inIsValid } = interested_inState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        firstNameIsValid &&
        lastNameIsValid &&
        emailIsValid &&
        passwordIsValid &&
        hobbyStateIsValid &&
        favoriteFoodStateIsValid &&
        musicTypeStateIsValid &&
        vacationSpotStateIsValid &&
        ageIsValid &&
        genderIsValid &&
        residenceIsValid &&
        interested_inIsValid
      );      
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [firstNameIsValid, lastNameIsValid, emailIsValid, passwordIsValid, hobbyStateIsValid,
    favoriteFoodStateIsValid, musicTypeStateIsValid, vacationSpotStateIsValid, ageIsValid, genderIsValid,
    residenceIsValid, interested_inIsValid]);

  const firstNameChangeHandler = (event) => {
    dispatchFirstName({ type: "USER_INPUT", val: event.target.value });
  };

  const lastNameChangeHandler = (event) => {
    dispatchLastName({ type: "USER_INPUT", val: event.target.value });
  };

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateFirstNameHandler = () => {
    dispatchFirstName({ type: "INPUT_BLUR" });
  };

  const validateLastNameHandler = () => {
    dispatchLastName({ type: "INPUT_BLUR" });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertToBase64(file)
    setPostImage(base64)
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    if (formIsValid) {
      const user = {
        fname: firstNameState.value,
        lname: lastNameState.value,
        password: passwordState.value,
        email: emailState.value,
        age: ageState.value,
        gender: genderState.value,
        residence: residenceState.value,
        hobby: hobbyState.value,
        favorite_food: favoriteFoodState.value,
        favorite_music: musicTypeState.value,
        songs: songsState.value,
        book: bookState.value,
        movies: moviesState.value,
        favorite_vacation_spot: vacationSpotState.value,
        interested_in: interested_inState.value,
        myPic: postImage
      };
      const resp = await instance.post('users/registration', user)
      navigate("/");
    } else {
      if (!firstNameIsValid) {
        firstNameInputRef.current.focus();
      } else if (!lastNameIsValid) {
        lastNameInputRef.current.focus();
      } else if (!emailIsValid) {
        emailInputRef.current.focus();
      } else {
        passwordInputRef.current.focus();
      }
    }
  };

  return (
    <Card className={classes.signup}>
      <form onSubmit={submitHandler} className={classes.formContainer}>
        <label htmlFor="file-upload" className={classes.customFileUpload}>
          <img className={classes.profilePic} src={postImage || avatar} alt="" />
          <input
              className={classes.fileUpload}
              type="file"
              label="Image"
              name="myFile"
              id="file-upload"
              accept=".jpeg, .png, .jpg"
              onChange={(e) => handleFileUpload(e)}
          />
        </label>
        <Input
          ref={firstNameInputRef}
          id="firstName"
          label="First Name"
          type="text"
          isValid={firstNameIsValid}
          value={firstNameState.value}
          onChange={firstNameChangeHandler}
          onBlur={validateFirstNameHandler}
        />
        <Input
          ref={lastNameInputRef}
          id="lastName"
          label="Last Name"
          type="text"
          isValid={lastNameIsValid}
          value={lastNameState.value}
          onChange={lastNameChangeHandler}
          onBlur={validateLastNameHandler}
        />
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
         <Input
          id="age"
          label="Age"
          type="text"
          isValid={ageState.isValid}
          value={ageState.value}
          onChange={(event) =>
            dispatchAge({ type: "USER_INPUT", val: event.target.value })
          }
          onBlur={() => dispatchAge({ type: "INPUT_BLUR" })}
        />
        <div className="gender-container">
          <label className='gender-label' htmlFor="gender">Gender:<label className={classes.genderHelper}>.................</label></label>
          <select
              id="gender"
              value={genderState.value}
              onChange={(event) =>
                  dispatchGender({ type: "USER_INPUT", val: event.target.value })
              }
              onBlur={() => dispatchGender({ type: "INPUT_BLUR" })}
          >
            <option value="">Select Gender</option> {/* Blank option */}
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <Input
          id="residence"
          label="Residence"
          type="text"
          isValid={residenceState.isValid}
          value={residenceState.value}
          onChange={(event) =>
            dispatchResidence({ type: "USER_INPUT", val: event.target.value })
          }
          onBlur={() => dispatchResidence({ type: "INPUT_BLUR" })}
        />
        <Input
          id="hobby"
          label="Hobby"
          type="text"
          isValid={hobbyState.isValid}
          value={hobbyState.value}
          onChange={(event) =>
            dispatchHobby({ type: "USER_INPUT", val: event.target.value })
          }
          onBlur={() => dispatchHobby({ type: "INPUT_BLUR" })}
        />
        <Input
          id="favoriteFood"
          label="Favorite Food"
          type="text"
          isValid={favoriteFoodState.isValid}
          value={favoriteFoodState.value}
          onChange={(event) =>
            dispatchFavoriteFood({
              type: "USER_INPUT",
              val: event.target.value,
            })
          }
          onBlur={() => dispatchFavoriteFood({ type: "INPUT_BLUR" })}
        />
        <Input
          id="musicType"
          label="Type of Music You Love"
          type="text"
          isValid={musicTypeState.isValid}
          value={musicTypeState.value}
          onChange={(event) =>
            dispatchMusicType({ type: "USER_INPUT", val: event.target.value })
          }
          onBlur={() => dispatchMusicType({ type: "INPUT_BLUR" })}
        />
        <Input
          id="twoSongs"
          label="Type two of your favorite sogns"
          type="text"
          isValid={songsState.isValid}
          value={songsState.value}
          onChange={(event) =>
            dispatchSongs({ type: "USER_INPUT", val: event.target.value })
          }
          onBlur={() => dispatchMusicType({ type: "INPUT_BLUR" })}
        />
        <Input
          id="book"
          label="Type your favorite book"
          type="text"
          isValid={bookState.isValid}
          value={bookState.value}
          onChange={(event) =>
            dispatchBook({ type: "USER_INPUT", val: event.target.value })
          }
          onBlur={() => dispatchMusicType({ type: "INPUT_BLUR" })}
        />
        <Input
          id="two movies"
          label="Type two of your favorite Movies"
          type="text"
          isValid={moviesState.isValid}
          value={moviesState.value}
          onChange={(event) =>
            dispatchMovies({ type: "USER_INPUT", val: event.target.value })
          }
          onBlur={() => dispatchMusicType({ type: "INPUT_BLUR" })}
        />
        <Input
          id="vacationSpot"
          label="Favorite Vacation Spot"
          type="text"
          isValid={vacationSpotState.isValid}
          value={vacationSpotState.value}
          onChange={(event) =>
            dispatchVacationSpot({
              type: "USER_INPUT",
              val: event.target.value,
            })
          }
          onBlur={() => dispatchVacationSpot({ type: "INPUT_BLUR" })}
        />
        <div className="interested-in-container">
          <label htmlFor="interested_in">Who are you interested in?</label>
          <select
              id="interested_in"
              value={interested_inState.value}
              onChange={(event) =>
                  dispatchInterested_in({ type: "USER_INPUT", val: event.target.value })
              }
              onBlur={() => dispatchInterested_in({ type: "INPUT_BLUR" })}
          >
            <option value="">Select Interest</option> {/* Blank option */}
            <option value="males">Males</option>
            <option value="females">Females</option>
            <option value="both">Both</option>
          </select>
        </div>



        <div className={classes.actions}>
          <Button type="submit">Sign Up</Button>
          <Link to="/">Already have an account? Login</Link>
        </div>
      </form>
    </Card>
  );
};

export default SignUp;

function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}