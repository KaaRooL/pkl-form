
import styles from "./spinner.module.css"

function spinner(){
  return(
<div className={styles["spinner-background"]}>
  <div className={styles.spinner}></div>
</div>)
}



export default spinner;