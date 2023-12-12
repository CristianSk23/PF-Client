import styles from "./loadingModule.module.css"

const Loading = () => {
    return(
        <div>
        <div className={styles.div}>
            <div class={styles.content}>
            <div className="vh-100 d-flex align-items-center justify-content-center">
            <span class={styles.loader}></span>
            <div className={styles.h3}>
            <h3 className="display-5 fw-bold text-shadow shadow-light">Loading</h3>
            </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Loading