import React, { Component } from 'react';
import axios from 'axios';

export default class LoginBox extends Component {
	constructor() {
		super();

		this.state = {
			error: false,
			errorMessage: '',
			loggedIn: false,
			user: ''
		};

		this.value = {
			email: '',
			password: ''
		};

		this.login = this.login.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.clearError = this.clearError.bind(this);
		this.onPasswordKP = this.onPasswordKP.bind(this);
	}

	login() {
		if (this.value.email.length > 0 && this.value.password.length > 0) {
			axios.post('/login', {
				email: this.value.email,
				password: this.value.password
			}).then(resp => {
				if (resp.status == 200) {
					this.setState({
						loggedIn: true,
						user: resp.user
					});
				}
			}).catch(err => {
				this.setState({
					error: true,
					errorMessage: err.response.data.error.reason
				});
			});
		} else {
			this.setState({
				error: true,
				errorMessage: 'Please fill in all fields.'
			});
		}
	}

	onEmailChange(e) {
		this.value.email = e.target.value;
		this.clearError();
	}

	onPasswordChange(e) {
		this.value.password = e.target.value;
		this.clearError();
	}

	clearError() {
		if (this.state.error) {
			this.setState({
				error: false
			});
		}
	}

	onPasswordKP(e) {
		if (e.key == 'Enter') {
			this.login();
		}
	}


	render() {
		if (!this.state.loggedIn) {
			return (
				<div className='login-box-container'>
					<header
						className='login-title'
					>
						Login
					</header>
					<div className='login-box'>
						<div className='form'>

							{ this.state.error && (
								<div className="form__error-wrapper">
									<p className="form__error">
										{this.state.errorMessage}
									</p>
								</div>
							) }

							<div className='form-group'>
								<label className='label'>Email:</label>
								<div className='input'>
									<input type='email' placeholder='Email Address' onChange={this.onEmailChange} />
								</div>
							</div>
							<div className='form-group'>
								<label className='label'>Password:</label>
								<div className='input'>
									<input type='password' placeholder='*****' onChange={this.onPasswordChange} onKeyPress={this.onPasswordKP} />
								</div>
							</div>
							<div className='form-group form-actions'>
								<a className='link left'
									onClick={() => veranda.redirect('/signup')}
								>Sign Up</a>
								<button
									className='btn enter-button right'
									onClick={this.login}
								>Login</button>
							</div>
						</div>
					</div>
				</div>
			);
		}

		else {
			return (
				<div className='login-box-container2'>
					<header
						className='login-title'
					>
						Welcome back, {this.state.user} !
					</header>
					<div className='login-box2'>
						<div className='form'>
							<button
								className='btn dashboard-button right'
								onClick={() => veranda.redirect('/dashboard')}
							>Go to the Dashboard</button>
							<button
								className='btn createCourse-button right'
								onClick={() => veranda.redirect('/createCourse')}
							>Create a Course</button>
						</div>
					</div>
				</div>
			);
		}
	}
}
