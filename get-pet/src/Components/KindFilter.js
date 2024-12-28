import classes from "./KindFilter.module.css";
const KindFilter = () => {
  return (
    <div className={classes.dropdown}>
      <button className={classes.dropbtn}>Kind</button>
      <div className={classes.dropdownContent}>
        <a href="/dogs">Dog</a>
        <a href="/cats">Cat</a>
        <a href="/birds">Bird</a>
      </div>
    </div>
  );
};
export default KindFilter;
