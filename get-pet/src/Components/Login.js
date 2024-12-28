import classes from "./Login.module.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [enteredUsername, setUsername] = useState("");
  const [enteredPassword, setPassword] = useState("");
  const [error, setError] = useState("");
  function usernameHandler(e) {
    const value = e.target.value;
    setUsername(value);
  }
  function passwordHandler(e) {
    const value = e.target.value;
    setPassword(value);
  }

  const loginHandler = async () => {
    try {
      const activationURL = `http://localhost:8080/login/${enteredUsername}/${enteredPassword}`;
      const res = await axios.get(activationURL);
      authCtx.login(res.data.user.id, res.data.user.userName);
      navigate("/");
    } catch {
      setError("Invalid username or password.");
      setUsername("");
      setPassword("");
    }
  };
  return (
    <div className={classes.container}>
      {error && <p className={classes.error}>{error}</p>}
      <h4 className={classes.heading}>Log In</h4>
      <label className={classes.credential}>Username</label>
      <input
        className={classes.input}
        value={enteredUsername}
        type="text"
        onChange={usernameHandler}
      ></input>
      <label className={classes.credential}>Password</label>
      <input
        className={classes.input}
        value={enteredPassword}
        type="password"
        onChange={passwordHandler}
      ></input>
      <button className={classes.loginButton} onClick={loginHandler}>
        Log In
      </button>
      <Link to="/signUp" className={classes.link}>
        Sign Up
      </Link>
      <Link to="/forgotPassword" className={classes.link}>
        Forgot Password?
      </Link>
    </div>
  );
};

export default Login;
