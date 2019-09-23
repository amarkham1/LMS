import React from 'react';
import './propertytable.css';

class PropertyTable extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			propertydata: this.props.propertydata,
			propertySelected: '',
		}
		this.handlePropertyClick = this.handlePropertyClick.bind(this);
	}

	handlePropertyClick(row) {
		console.log('row id', row.id);
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
							<th className="big title left">Property</th>
							<th className="big title left">Address</th>
							<th className="mid title left">City</th>
							<th className="mid title left">Province</th>
							<th className="mid title left">Portfolio</th>
							<th className="mid title left">GLA (SF)</th>
							<th className="mid title left">Storeys</th>
							<th className="mid title left">Site Area (SF)</th>
							<th className="small title left">Year Built</th>
							<th className="small title left">Year Acquired</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.propertydata.map(row => (
								<tr
								  key={row.id} 
								  className={ this.state.propertySelected === row.id ? "tr active" : "tr" }>
									<td 
										className="mid left rows toprow"
										onClick={() => this.handlePropertyClick(row)}
									>{row.propertyname}</td>
									<td 
										className="mid left rows"
										onClick={() => this.handlePropertyClick(row)}
									>{row.address}</td>
									<td 
										className="mid left rows"
										onClick={() => this.handlePropertyClick(row)}
									>{row.city}</td>
									<td 
										className="mid left rows"
										onClick={() => this.handlePropertyClick(row)}
									>{row.province}</td>
									<td 
										className="mid left rows"
										onClick={() => this.handlePropertyClick(row)}
									>{row.portfolio}</td>
									<td 
										className="mid left rows"
										onClick={() => this.handlePropertyClick(row)}
									>{row.rentablearea}</td>
									<td 
										className="mid left rows"
										onClick={() => this.handlePropertyClick(row)}
									>{row.storeys}</td>
									<td 
										className="mid left rows"
										onClick={() => this.handlePropertyClick(row)}
									>{row.siteareasf}</td>
									<td 
										className="mid left rows"
										onClick={() => this.handlePropertyClick(row)}
									>{row.yearbuilt}</td>
									<td 
										className="small left rows"
										onClick={() => this.handlePropertyClick(row)}
									>{row.yearacquired}</td>
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