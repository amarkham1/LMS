import React, { Component } from 'react';
import './register.css';

function validate(firstName, lastName, email, password, confirmPassword) { 
	return {
		firstName: (firstName.length === 0),
		lastName: (lastName.length === 0),
		email: validateEmail(email),
		password: validatePassword(password),
		confirmPassword: (confirmPassword !== password),
	};
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  	return !re.test(email);
}

function validatePassword(password) {
	return (passwordLengthError(password) || passwordCaseError(password) || passwordNumberError(password) || passwordSymbolError(password));
}

function passwordLengthError(password) {
	return (password.length < 8);
}

function passwordCaseError(password) {
	var upper = /(?=.*[a-z])/;
	var lower = /(?=.*[A-Z])/;
	return !(upper.test(password) && lower.test(password));
}

function passwordNumberError(password) {
	var re = /(?=.*[0-9])/;
	return !(re.test(password));
}

function passwordSymbolError(password) {
	var re = /(?=.[!@#\$%\^&])/;
	return !(re.test(password));
}

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			confirmPassword: '',
			passwordFocus: false,
			userExists: false,
			touched: {
				firstName: false,
				lastName: false,
				email: false,
				password: false,
				confirmpassword: false
			}
		}
	}

	onFirstNameChange = (event) => {
		this.setState({firstName: event.target.value})
	}

	onLastNameChange = (event) => {
		this.setState({lastName: event.target.value})
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}

	onConfirmPWChange = (event) => {
		this.setState({confirmPassword: event.target.value})
	}

	onSubmitSignIn = (event) => {
		if (!this.canBeSubmitted()) {
			this.setState({
				touched: { ...this.state.touched, 'firstName': true, 'lastName': true, 'email': true, 'password': true}
			})
			event.preventDefault();
			return;

		}
		fetch('http://localhost:3000/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				firstName: this.state.firstName,
				lastName: this.state.lastName
			})
		})
		  .then(response => response.json())
		  /*.then(exists => {
		  	if(exists) {
		  		this.setState({userExists: true})
		  	}
		  })*/
		  .then(user => {
		  	if(user) {
		  		console.log("user??");
		  		this.props.loadUser(user)
		  		this.props.onRouteChange('home');
		  	} 
		  })
	}

	handleBlur = (field) => (event) => {
		this.setState({
			touched: { ...this.state.touched, [field]: true},
		});
	}

	handlePWFocus = (event) => {
		this.setState({passwordFocus: true})
	}

	handleEmailFocus = (event) => {
		if (this.state.userExists) {
			this.setState({userExists: false})
		}
	}

	canBeSubmitted() {
		const errors = validate(this.state.firstName, this.state.lastName, this.state.email, this.state.password, this.state.confirmPassword);
		const isDisabled = Object.keys(errors).some(x => errors[x]);
		return !isDisabled;
	}

	render() {
		const errors = validate(this.state.firstName, this.state.lastName, this.state.email, this.state.password, this.state.confirmPassword);
		const isDisabled = Object.keys(errors).some(x => errors[x]);
		const shouldMarkError = (field) => {
			return errors[field] && this.state.touched[field];
		}
		const { onRouteChange } = this.props;
		return (
		    <div className="cont_principal">
			  <div className="cont_centrar">
			    <div className="cont_login">
			        <div className="cont_tabs_login">
			          <ul className='ul_tabs'>
			            <li><p onClick={() => onRouteChange('signin') }>SIGN IN</p>
			              <span className="linea_bajo_nom"></span>
			            </li>
			            <li className="active">
			            <p onClick= {() => onRouteChange('register') }>REGISTER</p><span className="linea_bajo_nom"></span>
			            </li>
			          </ul>
			        </div>
			          <div className="cont_text_inputs">
			         	<input 
					    	type="text" 
					    	className={shouldMarkError('firstName') ? "input_form_sign d_block error" : "input_form_sign d_block active_inp"}
					    	placeholder="FIRST NAME" 
					    	name="name_us" 
					    	value={this.state.firstName}
					    	onChange={this.onFirstNameChange}
					    	onBlur={this.handleBlur('firstName')}
					    />
					    { shouldMarkError('firstName') ? (
				    		<p className="error_text">Please provide a first name.</p>
				    		) : null
				    	}
					    
					    <input 
					    	type="text" 
					    	className={shouldMarkError('lastName') ? "input_form_sign d_block error" : "input_form_sign d_block active_inp"}
					    	placeholder="LAST NAME" 
					    	name="name_us" 
					    	value={this.state.lastName}
					    	onChange={this.onLastNameChange}
					    	onBlur={this.handleBlur('lastName')}
					    />
				    	{ shouldMarkError('lastName') ? (
				    		<p className="error_text">Please provide a last name.</p>
				    		) : null
				    	}
					    	
					    <input 
					    	type="text" 
					    	className={ (shouldMarkError('email') || this.state.userExists) ? "input_form_sign d_block error" : "input_form_sign d_block active_inp"}
					    	placeholder="EMAIL" 
					    	name="email_us" 
					    	value={this.state.email}
					    	onChange={this.onEmailChange}
					    	onFocus={this.handleEmailFocus}
					    	onBlur={this.handleBlur('email')}
					    />
					    { shouldMarkError('email') ? (
				    		<p className="error_text">Please provide a valid email address.</p>
				    		) : null
				    	}
			          	{ this.state.userExists && (
				    		<div className="error_text">
				    			A user already exists with that email address.
				    		</div>
				    		)
						}

					    <input 
					    	type="password" 
					    	className={shouldMarkError('password') ? "input_form_sign d_block error" : "input_form_sign d_block active_inp"}
					    	placeholder="PASSWORD" 
					    	name="pass_us" 
					    	value={this.state.password}
					    	onChange={this.onPasswordChange}
					    	onFocus={this.handlePWFocus}
					    	onBlur={this.handleBlur('password')}
					    />  
					    { this.state.passwordFocus ? (
				    		<div>
					    		<p className={passwordLengthError(this.state.password) ? "error_text" : "correct_text"}>Use 8 or more characters. 1</p>
					    		<p className={passwordCaseError(this.state.password) ? "error_text" : "correct_text"}>Use upper and lower case letters (e.g. Aa)  2</p>
					    		<p className={passwordNumberError(this.state.password) ? "error_text" : "correct_text"}>Use a number (e.g. 1234). 3</p>
					    		<p className={passwordSymbolError(this.state.password) ? "error_text" : "correct_text"}>Use a symbol (e.g. !@$%). 4</p>
					    	</div>
				    		) : null
				    	}
					   <input 
					   		type="password" 
					   		className={shouldMarkError('confirmPassword') ? "input_form_sign d_block error" : "input_form_sign d_block active_inp"} 
					   		placeholder="CONFIRM PASSWORD" 
					   		name="conf_pass_us" 
					    	value={this.state.confirmPassword}
					    	onChange={this.onConfirmPWChange}
					    	onBlur={this.handleBlur('confirmPassword')}
					   	/>
					   	{ shouldMarkError('confirmPassword') ? (
				    		<p className="error_text">Confirm password field must match the password field.</p>
				    		) : null
				    	}
			            </div>
					  <div className="cont_btn">
						{ isDisabled ? (
							<input 
					            type="submit" 
					            value="REGISTER" 
					            className="btn_sign_error"
					            onClick={this.onSubmitSignIn}
			            	/>
			            ) : (
								<input 
					            type="submit" 
					            value="REGISTER" 
					            className="btn_sign"
					            onClick={this.onSubmitSignIn}
			            	/>
			            )}
			          </div>
			          </div>
			      </div>
			    </div>
		);
	}
}

export default Register;