import React from 'react';
import './properties.css';
import PropertyEdit from './PropertyEdit/propertyedit.js';
import AddPropertyModal from '../Modals/AddPropertyModal/addpropertymodal.js';
import PropertyTable from './propertytable.js';

class Properties extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			propertiesdata: [],
			isLoading: true,
			propertySelected: '', /* set to '' */
			propertyadd: false,
			propertyedit: false, /* set to false */
		}
		this.handlePropertyAdd = this.handlePropertyAdd.bind(this);
		this.handlePropertyNoAdd = this.handlePropertyNoAdd.bind(this);
		this.handlePropertyClick = this.handlePropertyClick.bind(this);
		this.handlePropertyEdit = this.handlePropertyEdit.bind(this);
	}

	fetchProperties() {
		fetch('http://localhost:3000/deals', {
			method: 'get',
			headers: {'Content-Type': 'application/json'},
		})
		    .then(response => response.json())
		    .then(deals => {
		  	    this.setState({
		  	    	dealsdata: deals,
		  	    	isLoading: false,
		  	    })
		  	})
	}

	componentDidMount() {
		this.fetchProperties();
	}

	handlePropertyClick(row) {
		this.setState({
			propertySelected: row.id,
		})
	}

	handlePropertyAdd() {
		this.setState({propertyadd: true});
	}

	handlePropertyNoAdd() {
		this.setState({propertyadd: false});
	}

	handlePropertyEdit() {
		this.setState({ propertyedit: true })
	}

	onEditProperty() {
		fetch('http://localhost:3000/deals/:id', {
				method: 'get',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					id: this.state.dealSelected.id,
				})
		})
		    .then(response => response.json())
		    .then(user => {
		  	  if(user.id) {
		  	  	this.setState({ signInError: false})
		  		this.props.loadUser(user)
		  		this.props.onRouteChange('deals/:id');
		  	  } else {
		  	  	this.setState({ signInError: true })
		  	  	// this.props.onRouteChange('signin');
		  	  }
		    })
	}

	render() {
	  const { onRouteChange } = this.props;
		return (
		  <div>
			  { !this.state.propertyedit ? 
			  	(
			  	  <div className="container">
				  <AddPropertyModal handlePropertyNoAdd={this.handlePropertyNoAdd} show={this.state.propertyadd}/>
					<div className="dealslist">
				 	  <div className="deal-buttons">
						<input className="btn" onClick={this.handlePropertyAdd} type="button" value="ADD PROPERTY" />
						{ this.state.propertySelected &&
							<input className="btn" type="button" value="EDIT PROPERTY" onClick={this.handlePropertyEdit}/>
						}
					  </div>
					  { !this.state.isLoading && 
					  	<PropertyTable propertiesdata={this.state.propertiesdata} handlePropertyClick={this.handlePropertyClick} />
					  }
					</div>
				  </div>
				) : (
				  <div className="container">
				    <PropertyEdit propertyid={this.state.propertySelected} />
				  </div>
				)
			  }
	 	  </div>
		);
	}
}

export default Properties;