import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ViewContainer from '../ViewContainer';
import LoginBox from '../components/LoginBox';

class Login extends Component {
	constructor() {
		super();

		this.state = { };
	}

	render() {
		return (
			<div className='login'>
				<LoginBox

				/>
			</div>
		);
	}
}

veranda.onReady(() => {
	ReactDOM.render(
		<ViewContainer><Login /></ViewContainer>,
		document.getElementById('root')
	);
});
