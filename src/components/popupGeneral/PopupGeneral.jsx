import styles from "./popupGeneral.module.css"

const PopupGeneral = ({textButton, descripcion, onClick}) => {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <div className="card text-bg-success mb-3" 
        style={{
          position: "fixed",
          top:220,
          width:"25%",
          height:"25%",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          zIndex:"1000"}}>
          <div className="card-header" 
          style={{
            position:"fixed",
            top:0,
            left:0,
            width:"100%",
            height:"100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex:1000
            }}>Header
          </div>
          <div className="card-body" style={{
            padding:"20px",
            textAlign:"center",
            zIndex:1001,
          }}>
            <h5 className="card-title" style={{}}>{descripcion}</h5>
            <button type="button" className="btn btn-outline-light" onClick={onClick} style={{marginTop:"20px"}}>{textButton}</button>
          </div>
        </div>
      </div>

    )
}
export default PopupGeneral



{/*        <div className={styles.confirmationModalContainer}>
          <div className={styles.confirmationModalBackdrop}></div>
          <div className={styles.confirmationModal}>
            <p>{descripcion}</p>
            <button onClick={onClick}>{textButton}</button>
          </div>
        </div> 
      
      
      
      
      
      
      */}