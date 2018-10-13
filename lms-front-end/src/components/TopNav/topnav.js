import React from 'react';
import './topnav.css';

const TopNav = ({ onRouteChange }) => {
		return (
			<div className="topnav">
				<div className="signout" onClick={() => onRouteChange('signout')}>
				    SIGN OUT    
				 </div>
			</div>
		);
}

export default TopNav;