import styles from "./popupGeneral.module.css"

const PopupGeneral = ({textButton, descripcion, onClick}) => {
    return (
        <div className={styles.confirmationModalContainer}>
          <div className={styles.confirmationModalBackdrop}></div>
          <div className={styles.confirmationModal}>
            <p>{descripcion}</p>
            <button onClick={onClick}>{textButton}</button>
          </div>
        </div>
    )
}
export default PopupGeneral