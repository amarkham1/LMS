import React from 'react';
import './dealedit.css';
import Select from 'react-select';
import moment from 'moment';
import AddNegotiationModal from '../../Modals/AddNegotiationModal/addnegotiationmodal.js';



class DealEdit extends React.Component {
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
		const fetchURLdeals = `http://localhost:3000/deals/13`; /* ${this.props.dealid} */
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

		const fetchURLdealnegs = `http://localhost:3000/dealneg/13`;
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
		  	  	console.log('response', dealnegs);
		  	  	console.log('state dealnegs', this.state.dealnegs);
		    })
	}

	componentDidMount() {
		this.loadDeal();
	}

	componentDidUpdate() {

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
		  	} else { console.log("uhoh")}
		  })
	}

	render() {
		const { dealid } = this.props;
		return (
			<div className="container">
			  { (!this.state.isLoadingDeal && !this.state.isLoadingNegs) ? ( 
				  <React.Fragment>
				  <AddNegotiationModal handleNegNoAdd={this.handleNegNoAdd} show={this.state.negadd} dealid={this.state.dealid} loadDeal={this.loadDeal.bind(this)}/>
				  <div className="left-col">
				    <div className="deal-summary">
				      <div className="innerbox split float-left">
				        <p className="boxtitle">DEAL SUMMARY</p>
						  <div className="table">
							<table>
								<tbody>
									<tr>
										<td className="float-left margin-right bold">Tenant Name: </td>
										<td className="text-left">
										  { this.state.dealSummaryEdit ? (      
											<input 
										    	type="text" 
										    	className="inputbox" 
										    	placeholder={this.state.deal[0].tenant} 
										    	name="property" 
										    	value={this.state.tenant}
										    	onChange={this.onTenantChange}
										    />  
										    ) : ( this.state.deal[0].tenant )
										  }
										</td>
									</tr>
									<tr>
										<td className="float-left margin-right bold">Property: </td>
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
										<td className="float-left margin-right bold">Unit: </td>
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
										<td className="float-left margin-right bold">Landlord Broker: </td>
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
										<td className="float-left margin-right bold">Tenant Broker: </td>
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
										<td className="float-left margin-right bold">Date Added: </td>
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
										<td className="float-left margin-right bold">Deal Type: </td>
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
				     <div className="innerbox split">
				       <p className="dropdown">LATEST TERMS DROPDOWN</p>
						<div className="table">
						  <table>
							<tbody>
								<tr>
									<td className="float-left margin-right bold">GLA (SF): </td>
									<td className="text-left"> 			      
										{ this.state.deal[0].tenant }
									</td>
								</tr>
								<tr>
									<td className="float-left margin-right bold">Commencement Date: </td>
									<td className="text-left"> 				      
										{ this.state.deal[0].tenant }
								    </td>
								</tr>
								<tr>
									<td className="float-left margin-right bold">Base Rent: </td>
									<td className="text-left"> 				      
										{ this.state.deal[0].tenant }
								    </td>
								</tr>
								<tr>
									<td className="float-left margin-right bold">Tenant Inducement: </td>
									<td className="text-left"> 				      
										{ this.state.deal[0].tenant }
								    </td>
								</tr>
								<tr>
									<td className="float-left margin-right bold">Internal Commission: </td>
									<td className="text-left"> 				      
										{ this.state.deal[0].tenant }
								    </td>
								</tr>
								<tr>
									<td className="float-left margin-right bold">External Commission: </td>
									<td className="text-left"> 				      
										{ this.state.deal[0].tenant }
								    </td>
								</tr>
								<tr>
									<td className="float-left margin-right bold">Landlord's Work: </td>
									<td className="text-left"> 				      
										{ this.state.deal[0].tenant }
								    </td>
								</tr>
								<tr>
									<td className="float-left margin-right bold">Free Rent: </td>
									<td className="text-left"> 				      
										{ this.state.deal[0].tenant }
								    </td>
								</tr>
								<tr>
									<td className="float-left margin-right bold">Market NER: </td>
									<td className="text-left"> 				      
										{ this.state.deal[0].tenant }
								    </td>
								</tr>
								<tr>
									<td className="float-left margin-right bold">Adjusted NER: </td>
									<td className="text-left"> 				      
										{ this.state.deal[0].tenant }
								    </td>
								</tr>
								<tr>
									<td className="float-left margin-right bold">Total Deal Costs: </td>
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
				  <div className="right-col">
				    <div className="files">
				        <p className="boxtitle">FILES</p> 
				    <p>any-wideLorem ipsum dolor sit amet, consectetur adipiscing elit. In tristique faucibus diam, sit amet fermentum risus vehicula id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean pellentesque, nulla vitae pharetra mollis, turpis odio hendrerit sapien, quis scelerisque ligula eros vel quam. Maecenas massa tortor, placerat vel malesuada vitae, finibus at nulla. Quisque cursus dui orci, eu ullamcorper felis lacinia eu. Sed pellentesque cursus nunc eget molestie. Vivamus eleifend scelerisque fermentum. Donec non mollis massa.

		Suspendisse ultrices nec 
					</p>
				    </div>
				  </div>
				  <div className="bottom-row">
				    <div className="negotiation-detail">
				        <div className="innerbox full">
					      <p className="boxtitle">NEGOTIATION DETAILS</p> 
					        <div className="buttons">
					            <input className="btn" onClick={this.handleNegAdd} type="button" value="ADD" />
					            <input className="btn" onClick={this.handleNegotiationCopy} type="button" value="COPY" />
					            <input className="btn" onClick={this.handleNegotiationEdit} type="button" value="EDIT" />
					            <input className="btn" onClick={this.handleNegotiationActive} type="button" value="MARK AS ACTIVE" />
					        </div>
					        <div className="negotiationtable">
						        <table>
									<thead>
										<tr className="titlerow">
											<th className="mid title left">Property</th>
											<th className="small title left">Unit(s)</th>
											<th className="small title left">GLA (SF)</th>
											<th className="mid title left">Status</th>
											<th className="mid title left">Date Added</th>
											<th className="mid title left">Fixturing Date</th>
											<th className="mid title left">Commencement Date</th>
											<th className="mid title left">Rent</th>
											<th className="mid title left">TI</th>
											<th className="mid title left">Int. Commission</th>
											<th className="mid title left">Ext. Commission</th>
											<th className="mid title left">LLW</th>
											<th className="small title left">Market NER</th>
											<th className="small title left">Adj. NER</th>
											<th className="mid title left">Total Deal Costs</th>
										</tr>
									</thead>
									<tbody> 
										{
											this.state.dealnegs.map(row => (
												<tr
												  key={row.id} 
												  className={ this.state.dealNegSelected === row.id ? "tr active" : "tr" }>
													<td 
														className="mid left rows toprow"
														onClick={() => this.handleDealNegClick(row)}
													>{row.propertyname}</td>
													<td 
														className="mid left rows"
														onClick={() => this.handleDealNegClick(row)}
													>{row.unit}</td>
													<td 
														className="small left rows"
														onClick={() => this.handleDealNegClick(row)}
													>{row.gla}</td>
													<td 
														className="small left rows"
														onClick={() => this.handleDealNegClick(row)}
													>{row.status}</td>
													<td 
														className="mid left rows"
														onClick={() => this.handleDealNegClick(row)}
													>{ moment(row.currdate, "YYYY-MM-DD").format('MMM D, YYYY') }</td>
													<td 
														className="mid left rows"
														onClick={() => this.handleDealNegClick(row)}
													>{moment(row.fdate, "YYYY-MM-DD").format('MMM D, YYYY')}</td>
													<td 
														className="mid left rows"
														onClick={() => this.handleDealNegClick(row)}
													>{moment(row.cdate, "YYYY-MM-DD").format('MMM D, YYYY')}</td>
													<td 
														className="mid left rows"
														onClick={() => this.handleDealNegClick(row)}
													>{row.rent1}</td>
													<td 
														className="small left rows"
														onClick={() => this.handleDealNegClick(row)}
													>{row.ti}</td>
													<td 
														className="mid left rows"
														onClick={() => this.handleDealNegClick(row)}
													>{row.intcomm}</td>
													<td 
														className="small left rows"
														onClick={() => this.handleDealNegClick(row)}
													>{row.extcomm}</td>
													<td 
														className="small left rows"
														onClick={() => this.handleDealNegClick(row)}
													>{row.llw}</td>
													<td 
														className="small left rows"
														onClick={() => this.handleDealNegClick(row)}
													>{row.llw}</td>
													<td 
														className="small left rows"
														onClick={() => this.handleDealNegClick(row)}
													>{row.llw}</td>
													<td 
														className="mid left rows"
														onClick={() => this.handleDealNegClick(row)}
													>{row.dealcosts}</td>
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