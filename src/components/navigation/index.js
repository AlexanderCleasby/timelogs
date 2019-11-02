import React from "react";
import "./navigation.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faGoogle } from '@fortawesome/free-brands-svg-icons'

import icon from './../../assets/icon.png'


export default class useractivities extends React.Component{
    constructor(props){
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
    }
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }
    render(){
    return (
    <div>
    <Navbar color="dark"  dark expand="md">
    <img src={icon}></img>
    <NavbarBrand className="text-light" href="/" >Time Logs</NavbarBrand>
    <NavbarToggler onClick={this.toggle} />
    <Collapse isOpen={this.state.isOpen} navbar>
        {(()=>{
            if(this.props.user){
                return(
                    <Nav  navbar>
                        <NavItem >
                            <NavLink className="text-light"  to="/day" tag={Link}>
                                Day
                            </NavLink>
                        </NavItem>
                        <NavItem >
                            <NavLink className="text-light" to="/myavtivities" tag={Link}>
                                My Activities
                            </NavLink>
                        </NavItem>
                        <NavItem >
                            <NavLink className="text-light" to="/reports" tag={Link}>
                                Reports
                            </NavLink>
                        </NavItem>
                    </Nav>
                )
        }
        })()}
        
        <Nav className="ml-auto" navbar>
            <NavItem>
                {(()=>{
                    if(!this.props.loggedIn){
                        return <NavLink className="nav-link" href='/auth/google'> Login with <FontAwesomeIcon icon={faGoogle} /></NavLink>}
                    else{
                        return <NavLink className="nav-link text-light" href='/auth/logout'> Log out {this.props.user.name.first}</NavLink>
                    }
                })()
                }
            </NavItem>
        </Nav>
        </Collapse>    
    </Navbar>
    </div> )
}
}