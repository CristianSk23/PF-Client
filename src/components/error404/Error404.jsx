import { Container } from "react-bootstrap"
import {useState} from "react"
import { Link } from "react-router-dom"
import styles from './error404.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFaceFrown, faFaceSmile } from "@fortawesome/free-solid-svg-icons"
import NavBar from "../navBar/NavBar"

const ErrorView = () => {
    const [hover, setHover] = useState(true)

    const handleMouseEnter = () => {
        setHover(false);
      }
    
      const handleMouseLeave = () => {
        setHover(true);
      }


    return (
        <div>
        <NavBar/>
        <div className={styles.div}>
                <div className="vh-100 d-flex align-items-center justify-content-center">
                <Link to="/" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.container}>
                <FontAwesomeIcon icon={hover ? faFaceFrown : faFaceSmile} size="10x"  />
                </Link>
                <div className={styles.card} data-bs-toggle="collapse" >
                <div>
                    <h1 className="display-1 fw-bold p-2">ERROR 404</h1>
                </div>
                <div>
                    <div>
                    <h2 className="display-6 fw-bold">Page not Found</h2>
                    </div>
                    <div>
                    </div>
                    <h3 className="display-8 fw-bold">
                    <Link to="/" className={styles.link}>
                    Click here to Back to a better place...
                    </Link> 
                    </h3>
                </div>
                </div>
                </div>
        </div>
        </div>
    )
}

export default ErrorView