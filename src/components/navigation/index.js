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
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';


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
    <Navbar color="primary"  dark expand="md">
    <NavbarBrand className="text-light" href='/' >Time Logs</NavbarBrand>
    <NavbarToggler onClick={this.toggle} />
    <Collapse isOpen={this.state.isOpen} navbar>
        {(()=>{
            if(this.props.user){
                return(
                    <Nav  navbar>
                        <NavItem >
                            <NavLink>
                                <Link className="text-light"  to="/day">Day</Link>
                            </NavLink>
                        </NavItem>
                        <NavItem >
                            <NavLink>
                                <Link  className="text-light" to="/myavtivities">My Activities</Link>
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
                        return <NavLink className="nav-link" href='/auth/google'> Login with google</NavLink>}
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