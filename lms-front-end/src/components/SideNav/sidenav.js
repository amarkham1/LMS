import React from 'react';
import './sidenav.css';
import dashicon from './dashboard.png';
import pipeicon from './pipeline.png';
import reporticon from './reports.png';

const SideNav = () => {
	return (
		<nav className="sidebar">
			  <a href="../App.js">
			    <div className="navicon">
				  <img src={ dashicon } alt="Dashboard" height="auto" width="40%" />DASHBOARD
			    </div>
			  </a>
			  <a href="../App.js">
			    <div className="navicon">
				<img src={ pipeicon } height="auto" width="40%" alt="Pipeline" />PIPELINE
			    </div>
			  </a>
			  <a href="../App.js">
			    <div className="navicon">
				<img src={ reporticon } height="auto" width="40%" alt="Reports" />REPORTS
			    </div>
			  </a>
		</nav>
	);
}

export default SideNav;