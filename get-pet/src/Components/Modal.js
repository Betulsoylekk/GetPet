import classes from "./Modal.module.css";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
const Modal = ({ children }) => {
  const navigate = useNavigate();
  const closeHandler = () => {
    navigate(-1);
  };
  return (
    <>
      <button onClick={closeHandler} className={classes.backdrop}></button>
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </>
  );
};
export default Modal;
