import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function Login(){
    return(
        <div className="container mb-3">
            <form>
                <div style={{textAlign: "center"}}>
                {/*LOGO   <img class="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> */}
                <h1 className="h3 mb-3 fw-normal">Login</h1>
                </div>
    
                <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                <label>Email address</label>
                </div>
                <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                <label>Password</label>
                </div>
            
                <div className="form-check text-start my-3">
                <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                <label className="form-check-label">
                    Remember me
                </label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                <button className="btn btn-primary w-100 py-2" type="submit" style={{marginTop:"20px"}}><FontAwesomeIcon icon={faGoogle} /></button>
                <div style={{textAlign: "center", marginTop: "10px"}}>
                <p>- OR -</p>
                <p className="mb-0" style={{marginTop: "10px"}}>
                    <a href="/register" className="text-center">Register a new membership</a>
                </p>
                </div>
            </form>
        </div>

    )
}