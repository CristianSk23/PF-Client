import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import styles from './error404.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons"

const ErrorView = () => {


    return (
        <div className={styles.div}>
                <div className="vh-100 d-flex align-items-center justify-content-center">
                <Link to="/">
                <FontAwesomeIcon icon={faFaceFrown} size="10x" className={styles.container} />
                </Link>
                <div className={styles.card} >
                <div>
                    <h1 className="display-1 fw-bold p-2">ERROR 404</h1>
                </div>
                <div>
                    <div>
                    <h2 className="display-6">Page not Found</h2>
                    </div>
                    <div>
                    </div>
                    <h3 className="display-8">
                    <Link to="/" className={styles.link}>
                    Back to a better place...
                    </Link> 
                    </h3>
                </div>
                </div>
                </div>
        </div>
    )
}

export default ErrorView