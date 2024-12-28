import classes from "./AboutPage.module.css";
const AboutPage = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>About Us</h1>
      <p className={classes.text}>
        Welcome to GetPet, your one-stop destination for animal adoption!
      </p>
      <p className={classes.text}>
        {" "}
        At GetPet, we believe that every pet deserves a loving home, and every
        home deserves the perfect pet. Founded in 2023, our mission is to
        simplify the adoption process, connecting pets in need with caring
        owners, and turning the joy of animal companionship into a reality for
        all. We understand the importance of the human-animal bond and know that
        pets are more than just animals – they're family. That's why we're
        dedicated to ensuring that every adoption is a perfect match. We feature
        a vast array of animals from rescue centers and shelters nationwide,
        spanning all breeds, sizes, and ages, to ensure that we can match each
        pet with the right person and the right home.
      </p>
      <div className={classes.contactInfo}>
        <img
          className={classes.profile}
          src={require("../images/Group 13.png")}
        />
        <div className={classes.contatctContainer}>
          <p className={classes.contactDetails}>Contact us:</p>
          <p className={classes.contactDetails}>Email: getpet@gmail.com</p>
          <p className={classes.contactDetails}>Phone: +90 442 634 17 55</p>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
