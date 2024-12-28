import Filters from "./Filters";
import classes from "./Listings.module.css";
import Posts from "./Posts";

const Listings = () => {
  return (
    <div className={classes.container}>
      <Filters />
      <div className={classes.listingsContainer}>
        <Posts />
      </div>
    </div>
  );
};
export default Listings;
