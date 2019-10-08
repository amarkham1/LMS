import React from "react";
import "./Signin.css";

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: "",
			signInPassword: "",
			signInError: false
		};
	}

	onEmailChange = event => {
		this.setState({ signInEmail: event.target.value });
	};

	onPasswordChange = event => {
		this.setState({ signInPassword: event.target.value });
	};

	onKeyPress = event => {
		if (event.keyCode === 13 && event.shiftKey === false) {
			event.preventDefault();
			this.onSubmitSignIn();
		}
	};

	onSubmitSignIn = () => {
		fetch("https://intense-temple-63357.herokuapp.com/signin", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					this.setState({ signInError: false });
					this.props.loadUser(user);
					this.props.onRouteChange("home");
				} else {
					this.setState({ signInError: true });
					// this.props.onRouteChange('signin');
				}
			});
	};

	render() {
		const { onRouteChange } = this.props;
		return (
			<div className="cont_principal">
				<div className="cont_centrar">
					<div className="cont_login">
						<div className="cont_tabs_login">
							<ul className="ul_tabs">
								<li className="active">
									<p onClick={() => onRouteChange("signin")}>
										SIGN IN
									</p>
									<span className="linea_bajo_nom"></span>
								</li>
								<li>
									<p
										onClick={() =>
											onRouteChange("register")
										}
									>
										REGISTER
									</p>
									<span className="linea_bajo_nom"></span>
								</li>
							</ul>
						</div>
						<form onKeyDown={event => this.onKeyPress(event)}>
							<div className="cont_text_inputs">
								{this.state.signInError && (
									<div className="error-above">
										Wrong email or password.
									</div>
								)}
								<input
									type="text"
									className="input_form_sign d_block active_inp"
									placeholder="EMAIL"
									name="email_us"
									onChange={this.onEmailChange}
								/>

								<input
									type="password"
									className="input_form_sign d_block  active_inp"
									placeholder="PASSWORD"
									name="pass_us"
									onChange={this.onPasswordChange}
								/>

								<p className="link_forgot_pass d_block">
									Forgot Password ?
								</p>
								<div className="terms_and_cons d_none"></div>
							</div>
						</form>
						<div className="cont_btn">
							<input
								className="btn_sign"
								onClick={this.onSubmitSignIn}
								type="submit"
								value="SIGN IN"
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Signin;
