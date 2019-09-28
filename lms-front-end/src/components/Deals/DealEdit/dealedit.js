import React from 'react';
import './dealedit.css';
import moment from 'moment';
import AddNegotiationModal from '../../Modals/AddNegotiationModal/addnegotiationmodal.js';
import PropTypes from 'prop-types';

class DealEdit extends React.Component {
	static propTypes = {
		dealSelected: PropTypes.number
	}
	
	constructor(props) {
		super(props);

		this.state = {
			isLoadingDeal: true,
			isloadingNegs: true,
			dealNegSelected: '',
			deal: [],
			dealnegs: [],
			dealSummaryEdit: false,
			negadd: false,
			dealid: this.props.dealid,
		}
		this.handleNegAdd = this.handleNegAdd.bind(this);
		this.handleNegNoAdd = this.handleNegNoAdd.bind(this);
	}

	loadDeal() {
		const fetchURLdeals = `http://localhost:3000/deals/${this.props.dealid}`; /* ${this.props.dealid} */
		fetch(fetchURLdeals, {
			method: 'get',
			headers: {'Content-Type': 'application/json'},
		})
		    .then(response => response.json())
		    .then(deal => {
		  	  	this.setState({ 
		  	  		isLoadingDeal: false,
		  	  		deal: deal,
		  	  	})
		    })

		const fetchURLdealnegs = `http://localhost:3000/dealneg/${this.props.dealid}`;
		fetch(fetchURLdealnegs, {
			method: 'get',
			headers: {'Content-Type': 'application/json'},
		})
		    .then(response => response.json())
		    .then(dealnegs => {
		  	  	this.setState({ 
		  	  		isLoadingNegs: false,
		  	  		dealnegs: dealnegs,
		  	  	})
		    })
	}

	componentDidMount() {
		this.loadDeal();
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

	handleNegAdd() {
		this.setState({negadd: true});
	}

	handleNegNoAdd() {
		this.setState({negadd: false});
	}

	handleDealNegClick(row) {
		this.setState({
			dealNegSelected: row.id,
		})
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
		  	if(deal.id) {
		  		this.props.handleDealNoAdd();
		  	}
		  })
	}

	render() {
		return (
			<div className="dealedit-container">
			  { (!this.state.isLoadingDeal && !this.state.isLoadingNegs) ? ( 
				  <React.Fragment>
				  <AddNegotiationModal handleNegNoAdd={this.handleNegNoAdd} show={this.state.negadd} dealid={this.state.dealid} loadDeal={this.loadDeal.bind(this)}/>
				  <div className="dealedit-left-col">
				    <div className="dealedit-summary">
				      <div className="de-innerbox de-split de-float-left">
				        <p className="dealedit-boxtitle">DEAL SUMMARY</p>
						  <div className="dealedit-table">
							<table>
								<tbody>
									<tr>
										<td className="de-float-left de-margin-right bold">Tenant Name: </td>
										<td className="text-left">
										  { this.state.dealSummaryEdit ? (      
											<input 
										    	type="text" 
										    	className="inputbox" 
										    	placeholder={this.state.deal[0].tenant} 
										    	name="tenant" 
										    	value={this.state.tenant}
										    	onChange={this.onTenantChange}
										    />  
										    ) : ( this.state.deal[0].tenant )
										  }
										</td>
									</tr>
									<tr>
										<td className="de-float-left de-margin-right bold">Property: </td>
										<td className="text-left">
										  { this.state.dealSummaryEdit ? (      
											<input 
										    	type="text" 
										    	className="inputbox" 
										    	placeholder={this.state.deal[0].property} 
										    	name="property" 
										    	value={this.state.property}
										    	onChange={this.onPropertyChange}
										      /> 
										    ) : ( this.state.deal[0].property )
										  } 
									      </td>
									</tr>
									<tr>
										<td className="de-float-left de-margin-right bold">Unit: </td>
										<td className="text-left">
										  { this.state.dealSummaryEdit ? (      
											<input 
										    	type="text" 
										    	className="inputbox" 
										    	placeholder={this.state.deal[0].unit} 
										    	name="unit" 
										    	value={this.state.unit}
										    	onChange={this.onUnitChange}
										      />  
										    ) : ( this.state.deal[0].unit )
										  }
									      </td>
									</tr>
									<tr>
										<td className="de-float-left de-margin-right bold">Landlord Broker: </td>
										<td className="text-left">
										  { this.state.dealSummaryEdit ? (      
											<input 
										    	type="text" 
										    	className="inputbox" 
										    	placeholder={this.state.deal[0].llbroker} 
										    	name="llbroker" 
										    	value={this.state.llbroker}
										    	onChange={this.onLLBrokerChange}
										      />  
										    ) : ( this.state.deal[0].llbroker )
										  }
									      </td>
									</tr>
									<tr>
										<td className="de-float-left de-margin-right bold">Tenant Broker: </td>
										<td className="text-left">
										  { this.state.dealSummaryEdit ? (
											<input 
										    	type="text" 
										    	className="inputbox" 
										    	placeholder={this.state.deal[0].ttbroker} 
										    	name="property" 
										    	value={this.state.ttbroker}
										    	onChange={this.onTTBrokerChange}
										      />  
										    ) : ( this.state.deal[0].ttbroker )
										  }
									      </td>
									</tr>
									<tr>
										<td className="de-float-left de-margin-right bold">Date Added: </td>
										<td className="text-left">
										  { this.state.dealSummaryEdit ? (		      
											<input 
										    	type="text" 
										    	className="inputbox" 
										    	placeholder={ this.state.deal[0].creationdate} 
										    	name="creationdate" 
										    	value={this.state.creationdate}
										      />  
										    ) : ( moment(this.state.deal[0].creationdate, "YYYY-MM-DD").format('MMM D, YYYY') )
										  }
									    </td>
									</tr>
									<tr>
										<td className="de-float-left de-margin-right bold">Deal Type: </td>
										<td className="text-left">
										  { this.state.dealSummaryEdit ? (			      
											<input 
										    	type="text" 
										    	className="inputbox" 
										    	placeholder={this.state.deal[0].type} 
										    	name="property" 
										    	value={this.state.type}
										    	onChange={this.onTypeChange}
										      />  
										    ) : ( this.state.deal[0].type )
										  }
									      </td>
									</tr>
								</tbody>
							</table>
						</div>
				      <p></p>
				     </div>
				     <div className="de-innerbox de-split">
				       <p className="de-dropdown">LATEST TERMS DROPDOWN</p>
						<div className="dealedit-table">
						  <table>
							<tbody>
								<tr>
									<td className="de-float-left de-margin-right bold">GLA (SF): </td>
									<td className="text-left"> 			      
										{ this.state.deal[0].tenant }
									</td>
								</tr>
								<tr>
									<td className="de-float-left de-margin-right bold">Commencement Date: </td>
									<td className="text-left"> 				      
										{ this.state.deal[0].tenant }
								    </td>
								</tr>
								<tr>
									<td className="de-float-left de-margin-right bold">Base Rent: </td>
									<td className="text-left"> 				      
										{ this.state.deal[0].tenant }
								    </td>
								</tr>
								<tr>
									<td className="de-float-left de-margin-right bold">Tenant Inducement: </td>
									<td className="text-left"> 				      
										{ this.state.deal[0].tenant }
								    </td>
								</tr>
								<tr>
									<td className="de-float-left de-margin-right bold">Internal Commission: </td>
									<td className="text-left"> 				      
										{ this.state.deal[0].tenant }
								    </td>
								</tr>
								<tr>
									<td className="de-float-left de-margin-right bold">External Commission: </td>
									<td className="text-left"> 				      
										{ this.state.deal[0].tenant }
								    </td>
								</tr>
								<tr>
									<td className="de-float-left de-margin-right bold">Landlord's Work: </td>
									<td className="text-left"> 				      
										{ this.state.deal[0].tenant }
								    </td>
								</tr>
								<tr>
									<td className="de-float-left de-margin-right bold">Free Rent: </td>
									<td className="text-left"> 				      
										{ this.state.deal[0].tenant }
								    </td>
								</tr>
								<tr>
									<td className="de-float-left de-margin-right bold">Market NER: </td>
									<td className="text-left"> 				      
										{ this.state.deal[0].tenant }
								    </td>
								</tr>
								<tr>
									<td className="de-float-left de-margin-right bold">Adjusted NER: </td>
									<td className="text-left"> 				      
										{ this.state.deal[0].tenant }
								    </td>
								</tr>
								<tr>
									<td className="de-float-left de-margin-right bold">Total Deal Costs: </td>
									<td className="text-left"> 				      
										{ this.state.deal[0].tenant }
								    </td>
								</tr>
							</tbody>
						  </table>
						 </div>
				     </div>
				    </div>
				    
				  </div>
				  <div className="de-bottom-row">
				    <div className="negotiation-detail">
				        <div className="de-innerbox de-full">
					      <p className="dealedit-boxtitle">NEGOTIATION DETAILS</p> 
					        <div className="buttons">
					            <input className="btn" onClick={this.handleNegAdd} type="button" value="ADD" />
					        </div>
					        <div className="negotiationtable">
						        <table>
									<thead>
										<tr className="de-titlerow">
											<th className="de-mid title de-left">Property</th>
											<th className="de-small title de-left">Unit(s)</th>
											<th className="de-small title de-left">GLA (SF)</th>
											<th className="de-mid title de-left">Status</th>
											<th className="de-mid title de-left">Date Added</th>
											<th className="de-mid title de-left">Fixturing Date</th>
											<th className="de-mid title de-left">Commencement Date</th>
											<th className="de-mid title de-left">Rent</th>
											<th className="de-mid title de-left">TI</th>
											<th className="de-mid title de-left">Int. Commission</th>
											<th className="de-mid title de-left">Ext. Commission</th>
											<th className="de-mid title de-left">LLW</th>
											<th className="de-small title de-left">Market NER</th>
											<th className="de-small title de-left">Adj. NER</th>
											<th className="de-mid title de-left">Total Deal Costs</th>
										</tr>
									</thead>
									<tbody> 
										{
											this.state.dealnegs.map(row => (
												<tr
												  key={row.id} 
												  className={ this.state.dealNegSelected === row.id ? "tr active" : "tr" }>
													<td 
														className="de-mid de-left de-rows de-toprow"
														onClick={() => this.handleDealNegClick(row)}
													>{row.propertyname}</td>
													<td 
														className="de-mid de-left de-rows"
														onClick={() => this.handleDealNegClick(row)}
													>{row.unit}</td>
													<td 
														className="de-small de-left de-rows"
														onClick={() => this.handleDealNegClick(row)}
													>{row.gla.toLocaleString('en')}</td>
													<td 
														className="de-small de-left de-rows"
														onClick={() => this.handleDealNegClick(row)}
													>{row.status}</td>
													<td 
														className="de-mid de-left de-rows"
														onClick={() => this.handleDealNegClick(row)}
													>{ moment(row.currdate, "YYYY-MM-DD").format('MMM D, YYYY') }</td>
													<td 
														className="de-mid de-left de-rows"
														onClick={() => this.handleDealNegClick(row)}
													>{moment(row.fdate, "YYYY-MM-DD").format('MMM D, YYYY')}</td>
													<td 
														className="de-mid de-left de-rows"
														onClick={() => this.handleDealNegClick(row)}
													>{moment(row.cdate, "YYYY-MM-DD").format('MMM D, YYYY')}</td>
													<td 
														className="de-mid de-left de-rows"
														onClick={() => this.handleDealNegClick(row)}
													>{row.rent1}</td>
													<td 
														className="de-small de-left de-rows"
														onClick={() => this.handleDealNegClick(row)}
													>{row.ti}</td>
													<td 
														className="de-mid de-left de-rows"
														onClick={() => this.handleDealNegClick(row)}
													>{row.intcomm}</td>
													<td 
														className="de-small de-left de-rows"
														onClick={() => this.handleDealNegClick(row)}
													>{row.extcomm}</td>
													<td 
														className="de-small de-left de-rows"
														onClick={() => this.handleDealNegClick(row)}
													>{row.llw}</td>
													<td 
														className="de-small de-left de-rows"
														onClick={() => this.handleDealNegClick(row)}
													>{row.llw}</td>
													<td 
														className="de-small de-left de-rows"
														onClick={() => this.handleDealNegClick(row)}
													>{row.llw}</td>
													<td 
														className="de-mid de-left de-rows"
														onClick={() => this.handleDealNegClick(row)}
													>{row.dealcosts.toLocaleString('en')}</td>
												</tr>
											))
										}  
									</tbody>
								</table>
					        </div>
						</div>
					  </div>
				    </div>
				  </React.Fragment>
			 ) : null }
			</div>
		);
	}
}

export default DealEdit;