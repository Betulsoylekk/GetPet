import classes from "./ForgotPassword.module.css";
import { useState } from "react";

function ForgotPassword() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [message, setMessage] = useState("");

  function emailHandler(e) {
    setEnteredEmail(e.target.value);
  }

  function resetPassword(e) {
    e.preventDefault();
    console.log(enteredEmail);
    if (enteredEmail !== "") {
      setMessage(
        `An email has been sent to ${enteredEmail} with instructions on how to reset your password.`
      );
    } else {
      setMessage(`Please enter a valid email`);
    }

    setEnteredEmail("");
  }

  return (
    <div className={classes.container}>
      <h4 className={classes.heading}>Forgot Password</h4>
      <form className={classes.form} onSubmit={resetPassword}>
        <label className={classes.label} htmlFor="email">
          Email:
        </label>
        <input
          className={classes.input}
          id="email"
          type="email"
          value={enteredEmail}
          onChange={emailHandler}
        />
        <button className={classes.button} type="submit">
          Reset Password
        </button>
        <p className={classes.message}>{message}</p>
      </form>
    </div>
  );
}

export default ForgotPassword;
