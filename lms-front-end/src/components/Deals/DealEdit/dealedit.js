import React from 'react';
import './dealedit.css';
import moment from 'moment';

class DealEdit extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			deal: [],
			dealSummaryEdit: false,
		}
	}

	loadDeal() {
		const fetchURL = `http://localhost:3000/deals/13`; /* ${this.props.dealid} */
		fetch(fetchURL, {
			method: 'get',
			headers: {'Content-Type': 'application/json'},
		})
		    .then(response => response.json())
		    .then(deal => {
		  	  	this.setState({ 
		  	  		isLoading: false,
		  	  		deal: deal,
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
			  { !this.state.isLoading ? ( 
				  <React.Fragment>
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
				    <div className="negotiation-detail">
				        <div className="innerbox full">
					      <p className="boxtitle">NEGOTIATION DETAILS</p> 
					        <div className="buttons">
					            <input className="btn" onClick={this.handleNegotiationAdd} type="button" value="ADD" />
					            <input className="btn" onClick={this.handleNegotiationCopy} type="button" value="COPY" />
					            <input className="btn" onClick={this.handleNegotiationEdit} type="button" value="EDIT" />
					            <input className="btn" onClick={this.handleNegotiationActive} type="button" value="MARK AS ACTIVE" />
					        </div>
					        <div className="negotiationtable">
						        <table>
									<thead>
										<tr class="titlerow">
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
				  </React.Fragment>
			 ) : null }
			</div>
		);
	}
}

export default DealEdit;