import React, { Component } from 'react';

import InfoBox from './InfoBox';

export default class LoginBox extends Component {
	constructor() {
		super();

	}

	render() {
		return (
			<div className='login-box-container'>
				<header
					className='login-title'
					>Welcome to Veranda! Please login
				</header>
					<br></br><br></br>
				<div className='login-box'>
					<div id='ID'>email:</div>
					<input type='text' id='IDBox'></input>
					<br></br><br></br>
					<div id='password'>psw:</div>
					<input type='text' id='passwordBox'></input>
					<button
						className='enter-button'
					>Enter</button>
					<button
						className='cancel-button'
						onClick={() => veranda.redirect('/login')}
					>Cancel</button>
					<br></br><br></br>
					<a className='sign-up' href='/signup'>SignUp</a>

				</div>
			</div>
		);
	}
}
