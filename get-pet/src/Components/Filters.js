import React, { useState, useContext } from "react";
import { FilterContext } from "./FilterContext";
import { Link } from "react-router-dom";
import classes from "./Filters.module.css";
import { AuthContext } from "./AuthContext";
import moment from "moment";
const Filters = () => {
  const [enteredMinAge, setEnteredMinAge] = useState("");
  const [enteredMaxAge, setEnteredMaxAge] = useState("");
  const [enteredKind, setEnteredKind] = useState("");
  const [enteredLocation, setEnteredLocation] = useState("");
  const [enteredSpecialNeed, setEnteredSpecialNeed] = useState("");
  const [isadoptionFilter, setIsAdoptionFilter] = useState(false);
  const [isTakeCareFilter, setIsTakeCareFilter] = useState(false);
  const [enteredStartDate, setEnteredStartDate] = useState("");
  const [enteredEndDate, setEnteredEndDate] = useState("");
  const [postType, setPostType] = useState("");
  const { updateFilters } = useContext(FilterContext);
  const authCtx = useContext(AuthContext);
  function adoptionFilterOn() {
    setIsAdoptionFilter(!isadoptionFilter);
    setIsTakeCareFilter(false);
  }
  function takeCareFilterOn() {
    setIsTakeCareFilter(!isTakeCareFilter);
    setIsAdoptionFilter(false);
  }

  const enteredSpecialNeedHandler = (e) => {
    setEnteredSpecialNeed(e.target.value);
  };
  const enteredStartDateHandler = (e) => {
    const selectedDate = moment(e.target.value).format("YYYY-MM-DD");
    setEnteredStartDate(selectedDate);
  };
  const enteredEndDateHandler = (e) => {
    const selectedDate = moment(e.target.value).format("YYYY-MM-DD");
    setEnteredEndDate(selectedDate);
  };

  const enteredMinAgeHandler = (e) => {
    setEnteredMinAge(e.target.value);
  };
  const enteredMaxAgeHandler = (e) => {
    setEnteredMaxAge(e.target.value);
  };
  const enteredKindHandler = (e) => {
    setEnteredKind(e.target.value);
  };
  const enteredLocationHandler = (e) => {
    setEnteredLocation(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // Get the values of the user's input
    const location = enteredLocation.trim();
    const kind = enteredKind.trim();
    const minAge = parseFloat(enteredMinAge);
    const maxAge = parseFloat(enteredMaxAge);
    const specialNeed = enteredSpecialNeed.trim();
    const startDate = enteredStartDate;
    const endDate = enteredEndDate;
    const postType = isTakeCareFilter ? "take care" : "adoption";
    // Create an object to store the filters
    const filters = {
      location,
      kind,
      minAge,
      maxAge,
      specialNeed,
      startDate,
      endDate,
      postType,
    };
    updateFilters(filters);
  };
  const deleteHandler = () => {
    setEnteredLocation("");
    setEnteredKind("");
    setEnteredMinAge("");
    setEnteredMaxAge("");
    setEnteredSpecialNeed("");
    setEnteredEndDate("");
    setEnteredStartDate("");
    setIsAdoptionFilter(false);
    setIsTakeCareFilter(false);
    const filters = {
      location: "",
      kind: "",
      minAge: "",
      maxAge: "",
      specialNeed: "",
      startDate: "",
      endDate: "",
      postType: "",
    };
    updateFilters(filters);
  };
  const adoptionFilter = (
    <form className={classes.filterContainer} onSubmit={submitHandler}>
      <div className={classes.filter}>
        <select onChange={enteredLocationHandler} value={enteredLocation}>
          <option value="" disabled hidden>
            Location
          </option>
          <option value="izmir">İzmir</option>
          <option value="aydın">Aydın</option>
          <option value="istanbul">İstanbul</option>
        </select>
      </div>

      <div className={classes.filter}>
        <select onChange={enteredKindHandler} value={enteredKind}>
          <option value="" disabled hidden>
            Kind
          </option>
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className={classes.filter}>
        <input
          placeholder=" Age Min (Months)"
          type="number"
          min="0.1"
          step="0.1"
          value={enteredMinAge}
          onChange={enteredMinAgeHandler}
        />
      </div>

      <div className={classes.filter}>
        <input
          placeholder=" Age Max (Months)"
          type="number"
          min="0.1"
          step="0.1"
          value={enteredMaxAge}
          onChange={enteredMaxAgeHandler}
        />
      </div>

      <div className={classes.filter}>
        <select onChange={enteredSpecialNeedHandler} value={enteredSpecialNeed}>
          <option value="" disabled hidden>
            Special Needs
          </option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
      <button className={classes.filterButton} onClick={deleteHandler}>
        <ion-icon
          className={classes.filterIcon}
          name="trash-outline"
        ></ion-icon>
      </button>

      <button
        className={classes.filterButton}
        onClick={submitHandler}
        type="submit"
      >
        <ion-icon
          className={classes.filterIcon}
          name="checkmark-circle"
        ></ion-icon>
      </button>
    </form>
  );
  const takeCareFilter = (
    <form className={classes.filterContainerTakeCare} onSubmit={submitHandler}>
      <div className={classes.leftSide}>
        <div className={classes.innerWrapper}>
          <div className={classes.innerFilter}>
            <div className={classes.filter}>
              <select onChange={enteredLocationHandler} value={enteredLocation}>
                <option value="" disabled hidden>
                  Location
                </option>
                <option value="izmir">İzmir</option>
                <option value="aydın">Aydın</option>
                <option value="istanbul">İstanbul</option>
              </select>
            </div>

            <div className={classes.filter}>
              <select onChange={enteredKindHandler} value={enteredKind}>
                <option value="" disabled hidden>
                  Kind
                </option>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={classes.filter}>
              <input
                placeholder=" Age Min (Months)"
                type="number"
                min="0.1"
                step="0.1"
                value={enteredMinAge}
                onChange={enteredMinAgeHandler}
              />
            </div>

            <div className={classes.filter}>
              <input
                placeholder=" Age Max (Months)"
                type="number"
                min="0.1"
                step="0.1"
                value={enteredMaxAge}
                onChange={enteredMaxAgeHandler}
              />
            </div>
          </div>
          <div className={classes.innerFilter}>
            <div className={classes.filter}>
              <input
                placeholder="Start Date"
                type="date"
                value={enteredStartDate}
                onChange={enteredStartDateHandler}
                pattern="\d{4}-\d{2}-\d{2}"
                required
              />
            </div>
            <div className={classes.filter}>
              <input
                placeholder="End Date"
                type="date"
                value={enteredEndDate}
                onChange={enteredEndDateHandler}
                pattern="\d{4}-\d{2}-\d{2}"
                required
              />
            </div>
            <div className={classes.filter}>
              <select
                onChange={enteredSpecialNeedHandler}
                value={enteredSpecialNeed}
              >
                <option value="" disabled hidden>
                  Special Needs
                </option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <button className={classes.filterButton} onClick={deleteHandler}>
              <ion-icon
                className={classes.filterIcon}
                name="trash-outline"
              ></ion-icon>
            </button>

            <button
              className={classes.filterButton}
              onClick={submitHandler}
              type="submit"
            >
              <ion-icon
                className={classes.filterIcon}
                name="checkmark-circle"
              ></ion-icon>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
  return (
    <div className={classes.outerContainer}>
      <div className={classes.tabs}>
        <a
          className={isadoptionFilter ? classes.tabOpened : classes.tab}
          onClick={() => adoptionFilterOn()}
        >
          Adoption
        </a>
        <a
          className={isTakeCareFilter ? classes.tabOpened : classes.tab}
          onClick={() => takeCareFilterOn()}
        >
          Take Care
        </a>
      </div>
      <div className={classes.mainContainer}>
        {isadoptionFilter && adoptionFilter}
        {isTakeCareFilter && takeCareFilter}
        {!isTakeCareFilter && !isadoptionFilter && (
          <div className={classes.warning}>
            Choose either Adoption or Take Care to display the posts.
          </div>
        )}
        {authCtx.isLoggedIn}
        <Link
          className={classes.newPostButton}
          to={authCtx.isLoggedIn ? "/new-listing" : "/login"}
        >
          <ion-icon name="add-outline"></ion-icon>
        </Link>
      </div>
    </div>
  );
};

export default Filters;
