import classes from "./NewListing.module.css";
import moment from "moment";
import { useContext, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Components/AuthContext";
const NewListing = () => {
  const [invalidDate, setInvalidDate] = useState(false);
  const [isMissingVariables, setIsMissingVariables] = useState(false);
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredStartDate, setEnteredStartDate] = useState("");
  const [enteredEndDate, setEnteredEndDate] = useState("");
  const [enteredLocation, setEnteredLocation] = useState("");
  const [enteredKind, setEnteredKind] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [enteredSpecialNeed, setEnteredSpecialNeed] = useState("");
  const [enteredDetails, setEnteredDetails] = useState("");
  const [enteredPostType, setEnteredPostType] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();
  const [enteredPath, setEnteredPath] = useState(""); //sadece kontrol amaÃ§lÄ±

  const navigate = useNavigate("/");
  const postTypeHandler = (e) => {
    setEnteredPostType(e.target.value);
  };
  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const startDateChangeHandler = (e) => {
    const selectedDate = moment(e.target.value).format("YYYY-MM-DD");

    const formattedStartDate = `${selectedDate}`;
    const formattedStartDateForServer = moment(
      formattedStartDate,
      "YYYY-MM-DD"
    ).format("YYYY-MM-DD");
    setEnteredStartDate(formattedStartDateForServer);
  };

  const endDateChangeHandler = (e) => {
    const selectedDate = moment(e.target.value).format("YYYY-MM-DD");
    const formattedEndDate = `${selectedDate}`;
    const formattedEndDateForServer = moment(
      formattedEndDate,
      "YYYY-MM-DD"
    ).format("YYYY-MM-DD");
    setEnteredEndDate(formattedEndDateForServer);
  };
  const locationChangeHandler = (e) => {
    setEnteredLocation(e.target.value);
  };

  const kindChangeHandler = (e) => {
    setEnteredKind(e.target.value);
  };

  const ageChangeHandler = (e) => {
    setEnteredAge(e.target.value);
  };

  const specialNeedChangeHandler = (e) => {
    setEnteredSpecialNeed(e.target.value);
  };

  const detailsChangeHandler = (e) => {
    setEnteredDetails(e.target.value);
  };
  const titleChangeHandler = (e) => {
    setEnteredTitle(e.target.value);
    console.log(enteredTitle);
  };
  const fileChangeHandler = (e) => {
    setEnteredPath(e.target.value);
  };
  console.log(enteredPostType);
  const authCtx = useContext(AuthContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append("photo", file);
    }
    if (enteredPostType === "adoption") {
      if (
        enteredTitle &&
        enteredDetails &&
        enteredAge &&
        enteredLocation &&
        enteredKind &&
        enteredSpecialNeed
      ) {
        try {
          const activationURL = "http://localhost:8080/posts/createAdoption";
          formData.append("title", enteredTitle);
          formData.append("content", enteredDetails);
          formData.append("userId", authCtx.userId);
          formData.append("city", enteredLocation);
          formData.append("age", enteredAge);
          formData.append("kind", enteredKind);
          formData.append("specialNeeds", enteredSpecialNeed);
          const res = await axios.post(activationURL, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          setTimeout(() => {
            // Code to execute after the delay
            navigate("/");
            // ... other code
          }, 2000); // Delay of 2 seconds (2000 milliseconds)
        } catch (error) {
          console.log(error);
        }
      } else {
        setIsMissingVariables(true);
      }
    } else if (enteredPostType === "takecare") {
      console.log(enteredStartDate);
      console.log(enteredEndDate);
      if (
        enteredTitle &&
        enteredDetails &&
        enteredAge &&
        enteredLocation &&
        enteredKind &&
        enteredSpecialNeed &&
        enteredStartDate &&
        enteredEndDate
      ) {
        if (enteredStartDate > enteredEndDate) {
          setInvalidDate(true);
        } else {
          try {
            const activationURL = "http://localhost:8080/posts/createTakeCare";
            formData.append("title", enteredTitle);
            formData.append("content", enteredDetails);
            formData.append("userId", authCtx.userId);
            formData.append("city", enteredLocation);
            formData.append("age", enteredAge);
            formData.append("kind", enteredKind);
            formData.append("specialNeeds", enteredSpecialNeed);

            const res = await axios.post(activationURL, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        setIsMissingVariables(true);
      }
    } else {
      setIsMissingVariables(true);
    }
  };
  return (
    <div className={classes.mainContainer}>
      {isMissingVariables && (
        <h1 className={classes.warning}>Please Complete All Fields!</h1>
      )}
      {!isMissingVariables && invalidDate && <h1>Invalid Date</h1>}
      <h3 className={classes.mainHeader}>Add A Listing</h3>
      <form className={classes.listingContainer} onSubmit={submitHandler}>
        <div className={classes.sideContainer}>
          <div className={classes.divContainer}>
            <label className={classes.label}>Post Type</label>
            <select onChange={postTypeHandler} value={enteredPostType}>
              <option value="" disabled hidden>
                Post Type
              </option>
              <option value="adoption">Adoption</option>
              <option value="takecare">TakeCare</option>
            </select>
          </div>
          <div className={classes.divContainer}>
            <label className={classes.label}>Title</label>
            <input
              type="text"
              value={enteredTitle}
              onChange={titleChangeHandler}
              className={classes.input}
            />
          </div>
          <div className={classes.divContainer}>
            <label className={classes.label}>Location</label>
            <select onChange={locationChangeHandler} value={enteredLocation}>
              <option value="" disabled hidden>
                Location
              </option>
              <option value="izmir">İzmir</option>
              <option value="aydın">Aydın</option>
              <option value="istanbul">İstanbul</option>
            </select>
          </div>
          <div className={classes.divContainer}>
            <label className={classes.label}>Kind</label>
            <select onChange={kindChangeHandler} value={enteredKind}>
              <option value="" disabled hidden>
                Kind
              </option>
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className={classes.divContainer}>
            <label className={classes.label}>Age</label>
            <input
              placeholder="Month"
              type="Number"
              className={classes.input}
              onChange={ageChangeHandler}
              value={enteredAge}
            />
          </div>
        </div>
        <div className={classes.sideContainer}>
          <div className={classes.divContainer}>
            <label className={classes.label}>Special Needs</label>
            <select
              onChange={specialNeedChangeHandler}
              value={enteredSpecialNeed}
            >
              <option value="" disabled hidden>
                Special Needs
              </option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          {enteredPostType === "takecare" && (
            <div className={classes.divContainer}>
              <label className={classes.label}>Start Date</label>
              <input
                onChange={startDateChangeHandler}
                value={enteredStartDate}
                type="date"
                className={classes.input}
              />
            </div>
          )}
          {enteredPostType === "takecare" && (
            <div className={classes.divContainer}>
              <label className={classes.label}>End Date</label>
              <input
                onChange={endDateChangeHandler}
                value={enteredEndDate}
                type="date"
                className={classes.input}
              />
            </div>
          )}
          <div className={classes.divContainer}>
            <label className={classes.label}>Details</label>
            <textarea
              className={classes.inputDetails}
              rows="14"
              cols="100"
              value={enteredDetails}
              onChange={detailsChangeHandler}
            />
          </div>
          <div className={classes.divContainer}>
            <label className={classes.label}>Add Photo of Your Pet</label>{" "}
            <input
              type="file"
              accept="image/*;capture=camera"
              lang="en"
              onChange={onFileChange}
              ref={fileInputRef}
              className={classes.inputFile}
            />
          </div>
        </div>
        <div className={classes.divContainer}>
          <label className={classes.label}>Preview:</label>
          <div className={classes.imagePreviewContainer}></div>
          {file && (
            <img
              className={classes.previewImage}
              src={URL.createObjectURL(file)}
              alt="Preview"
            />
          )}

          <div className={classes.buttonContainer}>
            <button className={classes.submitButton} type="submit">
              Save
            </button>
            <Link className={classes.cancelButton} to="/">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
export default NewListing;
