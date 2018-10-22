import React from 'react';
import './dealedit.css';

class DealEdit extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tenant: '',
			property: '',
			unit: '',
		}
	}

	onTenantChange = (event) => {
		this.setState({tenant: event.target.value})
	}

	onPropertyChange = (event) => {
		this.setState({property: event.target.value})
	}

	onUnitChange = (event) => {
		this.setState({unit: event.target.value})
	}


	handleSubmit = () => {
		fetch('http://localhost:3000/dealsedit', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				tenant: this.state.tenant,
				property: this.state.property,
				unit: this.state.unit,
			})
		})
		  .then(response => response.json())
		  .then(deal => {
		  	if(deal) {
		  		this.props.handleDealNoAdd();
		  	} else { console.log("uhoh")}
		  })
	}

	render() {
		return (

			<div className="container"> 
			  <div className="dealslist">
			    <input 
			    	type="text" 
			    	className="plug" 
			    	placeholder="TENANT NAME" 
			    	name="tenant" 
			    	value={this.state.tenant}
			    	onChange={this.onTenantChange}
			    />

			    <input 
			    	type="text" 
			    	className="plug" 
			    	placeholder="PROPERTY" 
			    	name="property" 
			    	value={this.state.property}
			    	onChange={this.onPropertyChange}
			    />  
			     <input 
			    	type="text" 
			    	className="plug" 
			    	placeholder="UNIT" 
			    	name="unit" 
			    	value={this.state.unit}
			    	onChange={this.onUnitChange}
			    />  

			    <p><input
			    	type="button"
			    	className="plugbutton"
			    	placeholder="Add Deal"
			    	name="add"
			    	onClick= {this.handleSubmit}
			    /></p>
			    <p><input
			    	type="button"
			    	className="plugbutton"
			    	placeholder="Cancel"
			    	name="cancel"
			    	onClick= {this.props.handleDealNoAdd}
			    /></p>
			    </div>
			</div>
		);
	}
}

export default DealEdit;