import React from 'react';
import './deals.css';
import DealEdit from './DealEdit/dealedit.js';
import AddDealModal from '../Modals/AddDealModal/adddealmodal.js';

class Deals extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			dealsdata: [],
			isLoading: true,
			dealSelected: true,
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

	handleDealClick() {
		this.setState({dealSelected: true})
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
			  <AddDealModal handleDealNoAdd={this.handleDealNoAdd} show={this.state.dealadd}/>
				<div className="dealslist">
			 	  <div className="buttons">
					<input className="btn" onClick={this.handleDealAdd} type="button" value="ADD DEAL" />
					{ this.state.dealSelected &&
						<input className="btn" type="button" value="EDIT DEAL" />
					}
				  </div>
				  <div className="table">
					<table>
						<thead>
							<tr>
								<th className="big title left">Tenant</th>
								<th className="mid title left">Property</th>
								<th className="small title left">Unit</th>
								<th className="small title left">GLA (SF)</th>
								<th className="mid title left">Status</th>
								<th className="mid title left">Landlord Broker</th>
								<th className="mid title left">Tenant Broker</th>
								<th className="mid title left">Commencement Date</th>
								<th className="small title left">Adj. NER</th>
								<th className="mid title left">Total Deal Costs</th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.dealsdata.map(row => (
									<tr>
										<td 
											className="mid left rows toprow" 
											onClick={this.state.handleDealClick}
										>{row.tenant}</td>
										<td 
											className="mid left rows"
											onClick={this.state.handleDealClick}
										>{row.property}</td>
										<td 
											className="small left rows"
											onClick={this.state.handleDealClick}
										>{row.unit}</td>
										<td 
											className="small left rows"
											onClick={this.state.handleDealClick}
										>{row.gla}</td>
										<td 
											className="mid left rows"
											onClick={this.state.handleDealClick}
										>{row.status}</td>
										<td 
											className="mid left rows"
											onClick={this.state.handleDealClick}
										>{row.llbroker}</td>
										<td 
											className="mid left rows"
											onClick={this.state.handleDealClick}
										>{row.ttbroker}</td>
										<td 
											className="mid left rows"
											onClick={this.state.handleDealClick}
										>{row.cdate}</td>
										<td 
											className="small left rows"
											onClick={this.state.handleDealClick}
										>{row.adjner}</td>
										<td 
											className="mid left rows"
											onClick={this.state.handleDealClick}
										>{row.dealcosts}</td>
									</tr>
								))
							}  
						</tbody>
					</table>
				  </div>
				</div>
			</div>
		);
	}
}

export default Deals;