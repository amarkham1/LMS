import React, { Component } from 'react';
import './App.css';
import TopNav from './components/TopNav/TopNav.js';
import Home from './components/Home/Home.js';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
import Properties from './components/Properties/Properties.js';
import Deals from './components/Deals/Deals.js';
import Tenants from './components/Tenants/Tenants.js';
import Portfolios from './components/Portfolios/Portfolios.js';
import Reports from './components/Reports/Reports.js';

const initialState = {
	input: '',
    //change to 'signin' and false
	route: 'signin',
  isSignedIn: false,
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
  	const { isSignedIn, route, user } = this.state;
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
              return <Reports />
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
