import styles from "./popupConfirmation.module.css"
import { useState } from "react";

const PopupConfirmation = ({descripcion, nameProduct, onClickAccept, onClickCancel}) => {
    const [showButon, setShowButon] = useState(false)
    return (
        <div className="d-flex align-items-center justify-content-center">
          <div className="card text-bg-success mb-3" 
          style={{
            position: "fixed",
            top:220,
            width:"30%",
            height:"30%",
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
              <h5 className="card-title" style={{}}>{`${descripcion} ${nameProduct}?`}</h5>
              <button type="button" className="btn btn-outline-light" onClick={()=>{onClickAccept(); setShowButon(true)}} disabled={showButon} style={{marginTop:"20px", marginRight: "20px"}}>{"Accept"}</button>
              <button type="button" className="btn btn-outline-light" onClick={onClickCancel} style={{marginTop:"20px"}}>{"Cancel"}</button>
            </div>
          </div>
        </div>
  
      )
  }
export default PopupConfirmation;
