import React from "react";
import "./Deals.css";
import DealEdit from "./DealEdit/DealEdit.js";
import AddDealModal from "../Modals/AddDealModal/AddDealModal.js";
import DealTable from "./DealTable.js";

class Deals extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			dealsdata: [],
			isLoading: true,
			dealSelected: "" /* set to '' */,
			dealadd: false,
			dealedit: false /* set to false */
		};
		this.handleDealAdd = this.handleDealAdd.bind(this);
		this.handleDealNoAdd = this.handleDealNoAdd.bind(this);
		this.handleDealClick = this.handleDealClick.bind(this);
		this.handleDealEdit = this.handleDealEdit.bind(this);
		this.fetchDeals = this.fetchDeals.bind(this);
	}

	fetchDeals() {
		fetch("https://intense-temple-63357.herokuapp.com/deals", {
			method: "get",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(deals => {
				this.setState({
					dealsdata: deals,
					isLoading: false
				});
			});
	}

	componentDidMount() {
		this.fetchDeals();
	}

	handleDealClick(row) {
		this.setState({
			dealSelected: row.id
		});
	}

	handleDealAdd() {
		this.setState({ dealadd: true });
	}

	handleDealNoAdd() {
		this.setState({ dealadd: false });
	}

	handleDealEdit() {
		this.setState({ dealedit: true });
	}

	onEditDeal() {
		fetch("https://intense-temple-63357.herokuapp.com/deals/:id", {
			method: "get",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: this.state.dealSelected.id
			})
		})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					this.setState({ signInError: false });
					this.props.loadUser(user);
					this.props.onRouteChange("deals/:id");
				} else {
					this.setState({ signInError: true });
					// this.props.onRouteChange('signin');
				}
			});
	}

	render() {
		return (
			<div>
				{!this.state.dealedit ? (
					<div className="container">
						<AddDealModal
							handleDealNoAdd={this.handleDealNoAdd}
							show={this.state.dealadd}
							fetchDeals={this.fetchDeals}
						/>
						<div className="dealslist">
							<div className="deal-buttons">
								<input
									className="btn"
									onClick={this.handleDealAdd}
									type="button"
									value="ADD DEAL"
								/>
								{this.state.dealSelected && (
									<input
										className="btn"
										type="button"
										value="EDIT DEAL"
										onClick={this.handleDealEdit}
									/>
								)}
							</div>
							{!this.state.isLoading && (
								<DealTable
									dealsdata={this.state.dealsdata}
									handleDealClick={this.handleDealClick}
								/>
							)}
						</div>
					</div>
				) : (
					<div className="container">
						<DealEdit dealid={this.state.dealSelected} />
					</div>
				)}
			</div>
		);
	}
}

export default Deals;
