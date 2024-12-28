import { useNavigate } from "react-router-dom";
import classes from "./Signup.module.css";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Components/AuthContext";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);
  const [signUpFail, setSignUpFail] = useState(false);
  const [enteredName, setEnteredName] = useState("");
  const [enteredSurname, setEnteredSurname] = useState("");
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isMailValid, setIsMailValid] = useState(false);
  const [passwordsMatched, setPasswordsMatched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [enteredMail, setEnteredMail] = useState("");
  const [usernames, setUsernames] = useState([]);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    getAllUser();
  }, []);

  async function getAllUser() {
    try {
      const activationURL = `http://localhost:8080/users/allUsers`;
      const res = await axios.get(activationURL);
      const usernames = res.data.map((user) => user.userName);
      setUsernames(usernames);
    } catch (error) {
      console.error(error);
    }
  }

  const errorMessage = (
    <div>
      {!enteredName && <h1>Invalid name</h1>}
      {!enteredSurname && <h1>Invalid Surname</h1>}
      {!isMailValid && <h1>Email is not valid!</h1>}
      {!isUsernameValid && <h1>Invalid Username</h1>}
      {!isPasswordValid && <h1>Password is not valid!</h1>}
      {!passwordsMatched && <h1>Passwords are not matched!</h1>}
    </div>
  );

  function usernameHandler(e) {
    setSignUpFail(false);
    const enteredValue = e.target.value;
    setEnteredUsername(enteredValue);
    setIsUsernameValid(!usernames.includes(enteredValue));
  }

  function mailHandler(e) {
    setSignUpFail(false);
    const enteredValue = e.target.value;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEnteredMail(enteredValue);
    setIsMailValid(regexEmail.test(enteredValue));
  }

  function passwordValidHandler(e) {
    setSignUpFail(false);
    const enteredValue = e.target.value;
    setEnteredPassword(enteredValue);

    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    setIsPasswordValid(regexPassword.test(enteredValue));
  }

  function nameHandler(e) {
    setSignUpFail(false);
    const enteredValue = e.target.value;
    setEnteredName(enteredValue);
  }

  function surnameHandler(e) {
    setSignUpFail(false);
    const enteredValue = e.target.value;
    setEnteredSurname(enteredValue);
  }

  function passwordConfirmHandler(e) {
    setSignUpFail(false);
    const enteredValue = e.target.value;
    setPasswordsMatched(enteredValue === enteredPassword);
  }

  function showPasswordHandler() {
    setShowPassword(!showPassword);
    setChecked(!showPassword);
  }

  async function signUpHandler(e) {
    e.preventDefault();
    if (
      enteredName &&
      enteredSurname &&
      isMailValid &&
      isPasswordValid &&
      isUsernameValid &&
      passwordsMatched
    ) {
      const user = {
        role: "user",
        email: enteredMail,
        userName: enteredUsername,
        password: enteredPassword,
      };
      try {
        const response = await axios.post("http://localhost:8080/signup", user);
        try {
          const activationURL = `http://localhost:8080/login/${enteredUsername}/${enteredPassword}`;
          const res = await axios.get(activationURL);
          authCtx.login(res.data.user.id);
          navigate("/completeProfile");
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        setSignUpFail(true);
      }
    } else {
      setSignUpFail(true);
    }
  }

  return (
    <div className={classes.container}>
      <h4 className={classes.heading}>Create Your Account</h4>

      {signUpFail && (
        <div style={{ fontSize: "small", color: "red" }}>{errorMessage}</div>
      )}

      <label className={classes.credentials}>Name</label>
      <input
        className={classes.input}
        value={enteredName}
        onChange={nameHandler}
        type="text"
      />
      <label className={`${classes.heading} ${classes.label}`}>Surname</label>
      <input
        className={classes.input}
        value={enteredSurname}
        onChange={surnameHandler}
        type="text"
      />
      <label className={`${classes.heading} ${classes.label}`}>Mail</label>
      <input
        className={classes.input}
        value={enteredMail}
        onChange={mailHandler}
        type="text"
      />
      {isMailValid && (
        <span className={`tick-icon ${classes.icon}`}>&#10003;</span>
      )}
      <label className={`${classes.heading} ${classes.label}`}>Username</label>
      <input
        className={classes.input}
        type="text"
        onChange={usernameHandler}
        value={enteredUsername}
      />
      {isUsernameValid && (
        <span className={`tick-icon ${classes.icon}`}>&#10003;</span>
      )}
      {isUsernameValid === false && enteredUsername && (
        <p style={{ color: "red" }}>This username is already taken</p>
      )}
      <label className={`${classes.description}`}>
        Letters and numbers only
      </label>
      <label className={classes.label}>Password</label>
      <input
        className={classes.input}
        type={showPassword ? "text" : "password"}
        onChange={passwordValidHandler}
        value={enteredPassword}
      />
      {isPasswordValid && (
        <span className={`tick-icon ${classes.icon}`}>&#10003;</span>
      )}
      <label className={`${classes.description} ${classes.label}`}>
        Minimum 8 characters, at least one uppercase letter, one lowercase
        letter, and one number
      </label>
      <label className={classes.label}>Confirm Password</label>
      <input
        className={classes.input}
        id="confirmPassword"
        type={showPassword ? "text" : "password"}
        onChange={passwordConfirmHandler}
      />
      {passwordsMatched && (
        <span className={`tick-icon ${classes.icon}`}>&#10003;</span>
      )}
      <label className={classes.label}>Show Password</label>
      <input
        className={classes.input}
        checked={checked}
        type="checkbox"
        id="showPassword"
        onChange={showPasswordHandler}
      />
      <button className={classes.button} onClick={signUpHandler}>
        Sign Up
      </button>
      <Link to="/login" className={classes.a}>
        Log in instead
      </Link>
    </div>
  );
}

export default SignUp;
