import React, { Component } from 'react';
import './App.css';
import SideNav from './components/SideNav/sidenav.js';
import Body from './components/Body/body.js';
import Signin from './components/Signin/signin.js';
import Register from './components/Register/register.js';

const initialState = {
	input: '',
	route: 'signin',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
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
  		name: data.name,
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
      <div className="App">
      	{ route === 'home'
      	  ? <div>
		        <SideNav />
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
