import React from 'react';
import './propertytable.css';

class PropertyTable extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			propertiesdata: this.props.propertiesdata,
			propertySelected: '',
		}

		this.handlePropertyClick = this.handlePropertyClick.bind(this);
	}

	handlePropertyClick(row) {
		this.setState({
			propertySelected: row.id,
		})
		this.props.handlePropertyClick(row);
	}

	render() {
		return (
			<div className="propertytable">
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
							this.state.propertiesdata.map(row => (
								<tr
								  key={row.id} 
								  className={ this.state.propertySelected === row.id ? "tr active" : "tr" }>
									<td 
										className="mid left rows toprow"
										onClick={() => this.handlePropertyClick(row)}
									>{row.tenant}</td>
									<td 
										className="mid left rows"
										onClick={() => this.handlePropertyClick(row)}
									>{row.property}</td>
									<td 
										className="small left rows"
										onClick={() => this.handlePropertyClick(row)}
									>{row.unit}</td>
									<td 
										className="small left rows"
										onClick={() => this.handlePropertyClick(row)}
									>{row.gla}</td>
									<td 
										className="mid left rows"
										onClick={() => this.handlePropertyClick(row)}
									>{row.status}</td>
									<td 
										className="mid left rows"
										onClick={() => this.handlePropertyClick(row)}
									>{row.llbroker}</td>
									<td 
										className="mid left rows"
										onClick={() => this.handlePropertyClick(row)}
									>{row.ttbroker}</td>
									<td 
										className="mid left rows"
										onClick={() => this.handlePropertyClick(row)}
									>{row.cdate}</td>
									<td 
										className="small left rows"
										onClick={() => this.handlePropertyClick(row)}
									>{row.adjner}</td>
									<td 
										className="mid left rows"
										onClick={() => this.handlePropertyClick(row)}
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

export default PropertyTable;