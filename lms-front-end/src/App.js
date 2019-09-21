import React, { Component } from 'react';
import './App.css';
import TopNav from './components/TopNav/topnav.js';
import Home from './components/Home/home.js';
import Signin from './components/Signin/signin.js';
import Register from './components/Register/register.js';
import Properties from './components/Properties/properties.js';
import Deals from './components/Deals/deals.js';
import Tenants from './components/Tenants/tenants.js';
import Portfolios from './components/Portfolios/portfolios.js';

const initialState = {
	input: '',
    //change to 'signin' and false
	route: 'properties',
  isSignedIn: true,
    //change to 'signin' and false
	user: {
		id: '',
		firstName: '',
    lastName: '',
		email: '',
		joined: ''
	},
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

  loadDeal = (deal) => {
    this.setState((state) => ({
      dealid: deal
    }));    
  }

  onRouteChange = (route) => {
    switch(route) {
      case 'home':
      case 'portfolios':
      case 'properties':   
      case 'tenants': 
      case 'deals':    
      case 'reports':
      case 'deals/add':
          this.setState({isSignedIn: true})
          break;
      default:
          this.setState(initialState)
          break;
    }
  	this.setState({route: route});
  }

  render() {
  	const { isSignedIn, route, dealid, dealadd, user } = this.state;
    return (
      <div className="App body">
        <TopNav 
          firstName={user.firstName}
          lastName={user.lastName}
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        <div>
        {
          (() => {
            if (route === 'home') {
              return <Home />
            } else if (route === 'portfolios') {
              return <Portfolios />
            } else if (route === 'properties') {
              return <Properties />
            } else if (route === 'tenants') {
              return <Tenants />
            } else if (route === 'deals') {
              return <Deals />
            } else if (route === 'reports') {
              return <Home />
            } else if (route === 'signin') {
              return <Signin loadUser ={this.loadUser} onRouteChange={this.onRouteChange}/>
            } else {
              return <Register loadUser ={this.loadUser} onRouteChange={this.onRouteChange} />
            }
          })()
        }
        </div>
      </div>
    );
  }
}

export default App;
