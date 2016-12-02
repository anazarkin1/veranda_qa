import React, { Component } from 'react';

export default class LoginBox extends Component {
	constructor() {
		super();

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
						<div className='form-group'>
							<label className='label'>Email:</label>
							<div className='input'>
								<input type='email' placeholder='Email Address' />
							</div>
						</div>
						<div className='form-group'>
							<label className='label'>Password:</label>
							<div className='input'>
								<input type='password' placeholder='*****' />
							</div>
						</div>
						<div className='form-group form-actions'>
							<a className='link left'
								onClick={() => veranda.redirect('/signup')}
							>Sign Up</a>
							<button
								className='btn enter-button right'
							>Login</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
