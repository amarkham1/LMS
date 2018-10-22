import React from 'react';
import './deals.css';
import DealEdit from './DealEdit/dealedit.js';

class Deals extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			dealsdata: [],
			isLoading: true,
			dealSelected: false,
			dealid: null,
			dealadd: false,
		}
		this.handleDealAdd = this.handleDealAdd.bind(this);
		this.handleDealNoAdd = this.handleDealNoAdd.bind(this);
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

	handleDealAdd() {
		this.setState({dealadd: true});
	}

	handleDealNoAdd() {
		this.setState({dealadd: false});
	}

	onEditDeal() {
		fetch('http://localhost:3000/deals/:id', {
				method: 'get',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					id: this.state.dealid,
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
			{ this.state.dealadd ? (
				<DealEdit onRouteChange={this.onRouteChange} handleDealNoAdd={this.handleDealNoAdd}/>
			) : (
				<div className="dealslist">
					<input className="btn_add" onClick={this.handleDealAdd} type="button" value="ADD DEAL" />
					<table>
						<thead>
							<tr>
								<th>Tenant</th>
								<th>Property</th>
								<th>Unit</th>
								<th>GLA (SF)</th>
								<th>Status</th>
								<th>Landlord Broker</th>
								<th>Tenant Broker</th>
								<th>Commencement Date</th>
								<th>Adj. NER</th>
								<th>Total Deal Costs</th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.dealsdata.map(row => (
									<tr>
										<td>{row.tenant}</td>
										<td>{row.property}</td>
										<td>{row.unit}</td>
										<td>{row.gla}</td>
										<td>{row.status}</td>
										<td>{row.llbroker}</td>
										<td>{row.ttbroker}</td>
										<td>{row.cdate}</td>
										<td>{row.adjner}</td>
										<td>{row.dealcosts}</td>
									</tr>
								))
							}  
						</tbody>
					</table>
				</div>
			)}
			</div>
		);
	}
}

export default Deals;