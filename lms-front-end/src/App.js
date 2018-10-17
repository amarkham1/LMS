import React, { Component } from 'react';
import './App.css';
import TopNav from './components/TopNav/topnav.js';
import Body from './components/Body/body.js';
import Signin from './components/Signin/signin.js';
import Register from './components/Register/register.js';

const initialState = {
	input: '',
	route: 'home',
	isSignedIn: false,
	user: {
		id: '',
		firstName: '',
    lastName: '',
		email: '',
		joined: ''
	}
}

class App extends Component {
  constructor() {
  	super()
  	this.state = initialState;
  }

  loadUser = (data) => {
  	this.setState({user : {
  		id: data.id,
  		firstName: data.firstname,
      lastName: data.lastname,
  		email: data.email,
  		joined: data.joined
  	}})
  }

  onRouteChange = (route) => {
  	if (route === 'signout') {
  		this.setState(initialState)
  	} else if (route === 'home') {
  		this.setState({isSignedIn: true})
  	}
  	this.setState({route: route});
  }

  render() {
  	const { isSignedIn, route } = this.state;
    return (
      <div className="App body">
      	{ route === 'home'
      	  ? <div>
		          <TopNav 
                firstName={this.state.user.firstName}
                lastName={this.state.user.lastName}
                onRouteChange={this.onRouteChange}
              />
		          <Body />
		        </div>
		   : (
		   	  route === 'signin'
		   	  ? <Signin loadUser ={this.loadUser} onRouteChange={this.onRouteChange}/> 
		   	  : <Register loadUser ={this.loadUser} onRouteChange={this.onRouteChange}/>
		   	  )
		}
      </div>
    );
  }
}

export default App;
