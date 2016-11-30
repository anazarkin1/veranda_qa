import React, { Component } from 'react';

import InfoBox from './InfoBox';

export default class LoginBox extends Component {
	constructor() {
		super();

	}

	render() {
		return (
			<div className='loginBoxContainer'>
				<p className='loginTitle'>Welcome to Veranda! Please login</p>

				<div className='loginBox'>
					<div>ID</div>
					<InfoBox />
					<div>password</div>
					<InfoBox />

				</div>
			</div>
		);
	}
}
