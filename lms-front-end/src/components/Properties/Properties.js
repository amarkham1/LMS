import React from "react";
import "./Properties.css";
import AddPropertyModal from "../Modals/AddPropertyModal/AddPropertyModal.js";
import PropertyTable from "./PropertyTable.js";

class Properties extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			propertydata: [],
			isLoading: true,
			propertySelected: "" /* set to '' */,
			propertyadd: false,
			propertyedit: false /* set to false */
		};
		this.handlePropertyAdd = this.handlePropertyAdd.bind(this);
		this.handlePropertyNoAdd = this.handlePropertyNoAdd.bind(this);
		this.handlePropertyClick = this.handlePropertyClick.bind(this);
		this.handlePropertyEdit = this.handlePropertyEdit.bind(this);
	}

	fetchProperties() {
		fetch("https://intense-temple-63357.herokuapp.com/property", {
			method: "get",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(property => {
				this.setState({
					propertydata: property,
					isLoading: false
				});
			});
	}

	componentDidMount() {
		this.fetchProperties();
	}

	handlePropertyClick(row) {
		this.setState({
			propertySelected: row.id
		});
	}

	handlePropertyAdd() {
		this.setState({ propertyadd: true });
	}

	handlePropertyNoAdd() {
		this.setState({ propertyadd: false });
	}

	handlePropertyEdit() {
		this.setState({ propertyedit: true });
	}

	onEditProperty() {
		fetch("http://localhost:3000/property/:id", {
			method: "get",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: this.state.propertySelected.id
			})
		})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					this.setState({ signInError: false });
					this.props.loadUser(user);
					this.props.onRouteChange("property/:id");
				} else {
					this.setState({ signInError: true });
					// this.props.onRouteChange('signin');
				}
			});
	}

	render() {
		return (
			<div>
				<div className="container">
					<AddPropertyModal
						handlePropertyNoAdd={this.handlePropertyNoAdd}
						show={this.state.propertyadd}
					/>
					<div className="dealslist">
						<div className="deal-buttons">
							<input
								className="btn"
								onClick={this.handlePropertyAdd}
								type="button"
								value="ADD PROPERTY"
							/>
						</div>
						{!this.state.isLoading && (
							<PropertyTable
								propertydata={this.state.propertydata}
								handlePropertyClick={this.handlePropertyClick}
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default Properties;
