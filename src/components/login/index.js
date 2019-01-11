import React from "react";
import "./login.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faGoogle } from '@fortawesome/free-brands-svg-icons'

export default function login(){
return(
    <div className="container text-center">
    <a id="loginBtn" className="btn btn-primary" href='/auth/google'>Login with <FontAwesomeIcon icon={faGoogle} /></a>
    </div>
)


}