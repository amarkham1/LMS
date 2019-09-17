import React from 'react';
import './topnav.css';
import dashicon from './dashboard.png';
import pipeicon from './pipeline.png';
import reporticon from './reports.png';
import homeicon from './home.png';
import tenanticon from './tenants.png';
import portfolioicon from './portfolios.png';
import bell from './bell.png';
import PropTypes from 'prop-types';

class TopNav extends React.Component {
	static propTypes = {
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		onRouteChange: PropTypes.func,
		isSignedIn: PropTypes.bool,
	}

	static defaultProps = {
		firstName: 'Joe',
		lastName: 'Blow',
		isSignedIn: true,
	}

	constructor(props) {
	    super(props);

	    this.state = {
	    	showProfileMenu: false,
	    	showAlertMenu: false,
	    };
	    this.showProfileMenu = this.showProfileMenu.bind(this);
    	this.closeProfileMenu = this.closeProfileMenu.bind(this);
    	this.showAlertMenu = this.showAlertMenu.bind(this);
    	this.closeAlertMenu = this.closeAlertMenu.bind(this);
    }

	showProfileMenu(event) {
    	event.preventDefault();
    
   		this.setState({ showProfileMenu: true }, () => {
      	document.addEventListener('click', this.closeProfileMenu);
    	});
  	}
  
  	closeProfileMenu(event) {
        this.setState({ showProfileMenu: false }, () => {
        	document.removeEventListener('click', this.closeProfileMenu);
        });   
    }

    showAlertMenu(event) {
    	event.preventDefault();
    
   		this.setState({ showAlertMenu: true }, () => {
      	document.addEventListener('click', this.closeAlertMenu);
    	});
  	}
  
  	closeAlertMenu(event) {
        this.setState({ showAlertMenu: false }, () => {
        	document.removeEventListener('click', this.closeAlertMenu);
        });   
    }

    componentWillUnmount(){
    	document.removeEventListener("click", this.closeProfileMenu, false);
    	document.removeEventListener("click", this.closeAlertMenu, false);
	}

	render() {
		const { onRouteChange, firstName, lastName, isSignedIn } = this.props;
		const firstNameLetter = firstName.charAt(0).toUpperCase();
		const lastNameLetter = lastName.charAt(0).toUpperCase();
	    const avatarAbbrev = firstNameLetter.concat(lastNameLetter);
	    const fullName = firstName + " " + lastName;

	    if (isSignedIn) {
			return (
				<div className="nav">
				  <div className="top-nav">
				    <div className="search-bar">
				      <input type="text" placeholder="Search..." name="search" className="searchbox"/>
					</div>
					<div className="account">
					    <div className="alerticon" onClick={this.showAlertMenu}>
						  <img src={ bell } alt="Alerts" height="60%" width="auto" />
						</div>
					    <div 
						    className="avatar" 
						    onClick={this.showProfileMenu}>
						    {`${avatarAbbrev}`}
					    </div>
					</div>
				  </div>
				  <div className="bottom-nav">
				   {
			          this.state.showAlertMenu
			            ? (
			              <div
			                className="alertmenu"
			                ref={(element) => {
			                  this.dropdownMenu = element;
			                }}
			              >
			               	<p className="alerttitle">Alerts:</p>
			               	<p className="profilelist">No new alerts.</p>
			              </div>
			            )
			            : (
			              null
			            )
			        }
				    {
			          this.state.showProfileMenu
			            ? (
			              <div
			                className="profilemenu"
			                ref={(element) => {
			                  this.dropdownMenu = element;
			                }}
			              >
			               	<p className="loggedin">Logged in as:</p>
			               	<p className="avatarname">{`${fullName}`}</p>
			             	<p className="profilelist">Change Password</p>
			             	<p className="profilelist" onClick= {() => onRouteChange('signin')}>Sign out</p>
			              </div>
			            )
			            : (
			              null
			            )
			        }
				   <div className="icons">
					    <div className="navicon" onClick={() => onRouteChange('home') }>
						  <img src={ homeicon } alt="Home" height="60%" width="auto" />
						  <p className="icontext">HOME</p>
					    </div>
					    <div className="navicon" onClick={() => onRouteChange('portfolios') }>
						  <img src={ portfolioicon } alt="Portfolio" height="60%" width="auto" />
						  <p className="icontext">PORTFOLIOS</p>
					    </div>
					    <div className="navicon" onClick={() => onRouteChange('properties') }>
						  <img src={ dashicon } height="60%" width="auto" alt="Properties" />
						   <p className="icontext">PROPERTIES</p>
					    </div>
					    <div className="navicon" onClick={() => onRouteChange('tenants') }>
						  <img src={ tenanticon } alt="Tenants" height="60%" width="auto" />
						  <p className="icontext">TENANTS</p>
					    </div>
					    <div className="navicon" onClick={() => onRouteChange('deals') }>
						  <img src={ pipeicon } alt="Deals" height="60%" width="auto" />
						  <p className="icontext">DEALS</p>
					    </div>
					    <div className="navicon" onClick={() => onRouteChange('reports') }>
						  <img src={ reporticon } height="60%" width="auto" alt="Reports" />
						  <p className="icontext">REPORTS</p>
					    </div>
				   </div>
				  </div>
				</div>
			);
		} else { return (null)}
	}
}

export default TopNav;