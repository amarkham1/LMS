import React, { Component } from 'react';
import './App.css';
import TopNav from './components/TopNav/topnav.js';
import Home from './components/Home/home.js';
import Signin from './components/Signin/signin.js';
import Register from './components/Register/register.js';
import Properties from './components/Properties/properties.js';
import Deals from './components/Deals/deals.js';
import DealEdit from './components/Deals/DealEdit/dealedit.js';

const initialState = {
	input: '',
    //change to 'signin' and false
	route: 'deals',
  isSignedIn: true,
    //change to 'signin' and false
	user: {
		id: '',
		firstName: '',
    lastName: '',
		email: '',
		joined: ''
	},
  dealid: '',
  dealadd: false,
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
    console.log(this.state.dealid, "hi");

    
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
      	{ route === 'home'
      	  ? <div>
		          <Home />
		        </div>
		   : (
          route === 'portfolios'
          ? <div>
              <Home />
            </div>
          : (
            route === 'properties'
            ? <div>
               <Properties />
            </div>
            : (
              route === 'tenants'
              ? <div>
                  <Home />
                </div>
                : (
                  route === 'deals'
                  ? <div>
                      <Deals loadDeal = {this.loadDeal} onRouteChange={this.onRouteChange}/>
                    </div>
                    : (
                      route === 'dealedit'
                      ? <div>
                          <DealEdit dealid={dealid}/>
                        </div>
                        : (
                          route === 'reports'
                          ? <div>
                              <Home />
                            </div>
                            : (
                    		   	  route === 'signin'
                    		   	  ? <Signin loadUser ={this.loadUser} onRouteChange={this.onRouteChange}/> 
                    		   	  : <Register loadUser ={this.loadUser} onRouteChange={this.onRouteChange}/>
                    		   	  )))))))
		}
      </div>
    );
  }
}

export default App;
