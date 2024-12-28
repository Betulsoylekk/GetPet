import classes from "./CompleteProfile.module.css";
import { useState } from "react";
function CompleteProfile() {
  const today = new Date().toISOString().split("T")[0];
  const [enteredBirthDate, setEnteredBirthDate] = useState("");
  const [enteredGender, setEnteredGender] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredContactNo, setEnteredContactNo] = useState("");
  const [enteredUserInfo, setEnteredUserInfo] = useState("");
  const [message, setMessage] = useState("");

  function genderHandler(e) {
    setEnteredGender(e.target.value);
  }

  function birthDateHandler(e) {
    setEnteredBirthDate(e.target.value);
  }

  function addressHandler(e) {
    setEnteredAddress(e.target.value);
  }
  function contactNoHandler(e) {
    setEnteredContactNo(e.target.value);
  }
  function userInfoHandler(e) {
    setEnteredUserInfo(e.target.value);
  }
  function saveProfile(e) {
    e.preventDefault();

    if (
      enteredGender !== "Male" ||
      enteredGender !== "Female" ||
      enteredBirthDate === "" ||
      enteredAddress === "" ||
      enteredUserInfo === ""
    ) {
      setMessage("Please complete fields");
    } else if (enteredContactNo < 5000000000 || enteredContactNo > 5600000000) {
      setMessage("Please enter a valid number.");
    } else {
      setMessage("Profile updated succesfully");
    }
    console.log(enteredGender);
    console.log(enteredBirthDate);
    console.log(enteredContactNo);
    console.log(enteredAddress);
    console.log(enteredUserInfo);
    setEnteredAddress("");
    setEnteredBirthDate("");
    setEnteredContactNo("");
    setEnteredGender("");
    setEnteredUserInfo("");
  }

  return (
    <div className={classes.container}>
      <h4 className={classes.heading}>Complete Your Profile</h4>
      <form className={classes.form} onSubmit={saveProfile}>
        <label className={classes.label} htmlFor="date">
          Birth Date:
        </label>
        <input
          className={classes.input}
          id="date"
          type="date"
          max={today}
          value={enteredBirthDate}
          onChange={birthDateHandler}
        />
        <label className={classes.label} htmlFor="gender">
          Gender:
        </label>
        <select
          className={classes.select}
          id="gender"
          type="gender"
          value={enteredGender}
          onChange={genderHandler}
        >
          <option className={classes.option}>Please select a gender</option>
          <option className={classes.option}>Male</option>
          <option className={classes.option}>Female</option>
        </select>
        <label className={classes.label} htmlFor="address">
          Address:
        </label>
        <input
          className={classes.input}
          id="address"
          type="text"
          value={enteredAddress}
          onChange={addressHandler}
        />
        <label className={classes.label}>Contact No</label>
        <input
          className={classes.input}
          type="number"
          id="phone"
          value={enteredContactNo}
          name="phone"
          placeholder=""
          onChange={contactNoHandler}
        />
        <label className={classes.label}>
          Further Information About Yourself
        </label>
        <textarea
          value={enteredUserInfo}
          id="userInfo"
          onChange={userInfoHandler}
          rows="4"
          cols="40"
          className={classes.textarea}
        ></textarea>
        <button className={classes.button} type="submit">
          Save Profile
        </button>
        <p className={classes.message}>{message}</p>
      </form>
    </div>
  );
}

export default CompleteProfile;
