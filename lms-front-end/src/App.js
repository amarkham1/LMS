import React, { Component } from 'react';
import './App.css';
import TopNav from './components/TopNav/topnav.js';
import Body from './components/Body/body.js';
import Signin from './components/Signin/signin.js';
import Register from './components/Register/register.js';

const initialState = {
	input: '',
	route: 'signin',
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
    switch(route) {
      case 'home':
      case 'portfolios':
      case 'properties':   
      case 'tenants': 
      case 'deals':    
      case 'reports': 
          this.setState({isSignedIn: true})
          break;
      default:
          this.setState(initialState)
          break;
    }
  	this.setState({route: route});
  }

  render() {
  	const { isSignedIn, route } = this.state;
    return (
      <div className="App body">
        <TopNav 
          firstName={this.state.user.firstName}
          lastName={this.state.user.lastName}
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
      	{ route === 'home'
      	  ? <div>
		          <Body />
		        </div>
		   : (
          route === 'portfolios'
          ? <div>
              <Body />Portfolio
            </div>
          : (
            route === 'properties'
            ? <div>
               <Body />Properties
            </div>
            : (
              route === 'tenants'
              ? <div>
                  <Body />Tenants
                </div>
                : (
                  route === 'deals'
                  ? <div>
                      <Body />Deals
                    </div>
                    : (
                      route === 'reports'
                      ? <div>
                          <Body />Reports
                        </div>
                        : (
                		   	  route === 'signin'
                		   	  ? <Signin loadUser ={this.loadUser} onRouteChange={this.onRouteChange}/> 
                		   	  : <Register loadUser ={this.loadUser} onRouteChange={this.onRouteChange}/>
                		   	  ))))))
		}
      </div>
    );
  }
}

export default App;
