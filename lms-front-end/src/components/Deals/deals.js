import React from 'react';
import './deals.css';
import DealEdit from './DealEdit/dealedit.js';
import AddDealModal from '../Modals/AddDealModal/adddealmodal.js';
import DealTable from './dealtable.js';

class Deals extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			dealsdata: [],
			isLoading: true,
			dealSelected: '',
			dealadd: false,
		}
		this.handleDealAdd = this.handleDealAdd.bind(this);
		this.handleDealNoAdd = this.handleDealNoAdd.bind(this);
		this.handleDealClick = this.handleDealClick.bind(this);
		this.handleDealEdit = this.handleDealEdit.bind(this);
	}

	fetchDeals() {
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
		this.fetchDeals();
	}

	componentDidUpdate() {
		this.fetchDeals();
	}

	handleDealClick(row) {
		this.setState({
			dealSelected: row.id,
		})
	}

	handleDealAdd() {
		this.setState({dealadd: true});
	}

	handleDealNoAdd() {
		this.setState({dealadd: false});
	}

	handleDealEdit() {
		this.props.loadDeal(this.state.dealSelected);
		this.props.onRouteChange('dealedit');
	}

	onEditDeal() {
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
			<div className="container">
			  <AddDealModal handleDealNoAdd={this.handleDealNoAdd} show={this.state.dealadd}/>
				<div className="dealslist">
			 	  <div className="buttons">
					<input className="btn" onClick={this.handleDealAdd} type="button" value="ADD DEAL" />
					{ this.state.dealSelected &&
						<input className="btn" type="button" value="EDIT DEAL" onClick={this.handleDealEdit}/>
					}
				  </div>
				  { !this.state.isLoading && 
				  	<DealTable dealsdata={this.state.dealsdata} handleDealClick={this.handleDealClick} />
				  }
				</div>
			</div>
		);
	}
}

export default Deals;