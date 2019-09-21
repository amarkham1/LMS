import React from 'react';
import './dealtable.css';

class DealTable extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			dealsdata: this.props.dealsdata,
			dealSelected: '',
		}

		this.handleDealClick = this.handleDealClick.bind(this);
	}

	handleDealClick(row) {
		this.setState({
			dealSelected: row.id,
		})
		this.props.handleDealClick(row);
	}

	render() {
		return (
			<div className="dealtable">
				<table>
					<thead>
						<tr className="titlerow">
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
								<tr
								  key={row.id} 
								  className={ this.state.dealSelected === row.id ? "tr active" : "tr" }>
									<td 
										className="mid left rows toprow"
										onClick={() => this.handleDealClick(row)}
									>{row.tenant}</td>
									<td 
										className="mid left rows"
										onClick={() => this.handleDealClick(row)}
									>{row.property}</td>
									<td 
										className="small left rows"
										onClick={() => this.handleDealClick(row)}
									>{row.unit}</td>
									<td 
										className="small left rows"
										onClick={() => this.handleDealClick(row)}
									>{row.gla}</td>
									<td 
										className="mid left rows"
										onClick={() => this.handleDealClick(row)}
									>{row.status}</td>
									<td 
										className="mid left rows"
										onClick={() => this.handleDealClick(row)}
									>{row.llbroker}</td>
									<td 
										className="mid left rows"
										onClick={() => this.handleDealClick(row)}
									>{row.ttbroker}</td>
									<td 
										className="mid left rows"
										onClick={() => this.handleDealClick(row)}
									>{row.cdate}</td>
									<td 
										className="small left rows"
										onClick={() => this.handleDealClick(row)}
									>{row.adjner}</td>
									<td 
										className="mid left rows"
										onClick={() => this.handleDealClick(row)}
									>{row.dealcosts}</td>
								</tr>
							))
						}  
					</tbody>
				</table>
			</div>
		);
	}
}

export default DealTable;