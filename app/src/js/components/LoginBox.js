import React, { Component } from 'react';
import axios from 'axios';

export default class LoginBox extends Component {
	constructor() {
		super();

		this.value = {
			email: '',
			password: ''
		};

		this.login = this.login.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
	}

	login() {
		if (this.value.email && this.value.password) {
			axios.post('/login', {
				email: this.value.email,
				password: this.value.password
			}).then(resp => {
				if (resp.status == 200) {
					veranda.redirect('/');
				}
			}).catch(err => {
				console.log("Invalid email/password.");
			});
		}
	}

	onEmailChange(e) {
		this.value.email = e.target.value;
	}

	onPasswordChange(e) {
		this.value.password = e.target.value;
	}

	render() {
		return (
			<div className='login-box-container'>
				<header
					className='login-title'
				>
					Login
				</header>
				<div className='login-box'>
					<div className='form'>

						<div className="form__error-wrapper">
							<p className="form__error form__error--username-taken">Sorry, but this username is already taken.</p>
							<p className="form__error form__error--username-not-registered">This username does not exist.</p>
							<p className="form__error form__error--wrong-password">Wrong password.</p>
							<p className="form__error form__error--field-missing">Please fill out the entire form.</p>
							<p className="form__error form__error--failed">Something went wrong, please try again!</p>
						</div>

						<div className='form-group'>
							<label className='label'>Email:</label>
							<div className='input'>
								<input type='email' placeholder='Email Address' onChange={this.onEmailChange} />
							</div>
						</div>
						<div className='form-group'>
							<label className='label'>Password:</label>
							<div className='input'>
								<input type='password' placeholder='*****' ref='txtPassword' onChange={this.onPasswordChange} />
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
}
