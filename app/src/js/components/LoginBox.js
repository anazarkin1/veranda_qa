import React, { Component } from 'react';

import InfoBox from './InfoBox';

export default class LoginBox extends Component {
	constructor() {
		super();

	}

	render() {
		return (
			<div className='loginBoxContainer'>
				<header
					className='loginTitle'
					>Welcome to Veranda! Please login
				</header>
					<br></br><br></br>
				<div className='loginBox'>
					<div id='ID'>email:</div>
					<input type='text' id='IDBox'></input>
					<br></br><br></br>
					<div id='password'>psw:</div>
					<input type='text' id='passwordBox'></input>
					<button
						className='EnterButton'
					>Enter</button>
					<button
						className='CancelButton'
						onClick={() => veranda.redirect('/login')}
					>Cancel</button>
					<br></br><br></br>
					<a className='SignUp' href='/signup'>SignUp</a>

				</div>
			</div>
		);
	}
}
