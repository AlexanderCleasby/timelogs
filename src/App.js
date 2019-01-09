import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Navigation from './components/navigation';
import Login from './components/login'
import Day from './components/day'
import Home from './components/home'
import Useractivities from  './components/useractivities'
import Reports from './components/reports'
import { Route } from "react-router-dom";


class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null
		}
	}

 
  componentDidMount() {
    axios.get('/auth/user').then(response => {
      console.log(response.data)
      if (!!response.data.user) {
        console.log('THERE IS A USER')
        this.setState({
          loggedIn: true,
          user: response.data.user
        })
      } else {
        this.setState({
          loggedIn: false,
          user: null
        })
      }
    })
  }
  


  render() {
    console.log(this.state.user)
    return (
      <div className="App">

        <header className="App-header">
          <Navigation user={this.state.user} loggedIn={this.state.loggedIn} />
        </header>

    <Route exact path="/" render={Home} />
    <Route path="/login" render={() =><Login loggedIn={this.state.loggedIn} />} />
    <Route path="/day" render={() =><Day />} />
    <Route path="/myavtivities" render={()=><Useractivities />} />
    <Route path="/reports" render={()=><Reports />} />
    {(()=>{if(!(this.state.loggedIn)){
           return <Login />}})()}
      </div>
    );
  }
}

export default App;

