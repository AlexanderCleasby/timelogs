import React from "react";
import './home.css'
import {Jumbotron, Container} from 'reactstrap'
import icon from './../../assets/icon.png'
const Home = ()=>{
    return (
        <div>
            <Jumbotron >
                <Container fluid>
                    <img className="logo" src={icon} />
                    <h1 className="display-5">
                    Your Time Logs
                    </h1>
                    <p className="lead">An app for visualizing and tracking how you spend your time.</p>
                </Container>
            </Jumbotron>
                <p className="lead">Instructions:</p>
                    <ul className="list-group">
                        <a className="list-group-item">1. Add your activity categoties to the  <b>My Activites</b> tab</a>
                        <a className="list-group-item">2. Track the time you spend on those activites from <b>Day</b> tab</a>
                        <a className="list-group-item">3. Veiw reports of your tracked time from the <b>Reports</b> tab</a>
                    </ul>
            
            
        </div>
    )

}

export default Home