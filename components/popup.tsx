import styles from "./popup.module.css"

type PopupProps = {
  onClose(): void;
}

function popup( {onClose}: PopupProps ){
  return(
<div className={styles.popup}>
  <div className={styles["popup-content"]}>
    <span onClick={onClose} className={styles["close-button"]}>&times;</span>
    <p>Dziękujęmy za uzupełnienie formularza.</p>
  </div>
</div>)
}



export default popup;