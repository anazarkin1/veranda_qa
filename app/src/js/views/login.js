import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ViewContainer from '../ViewContainer';

class Login extends Component {
	constructor() {
		super();

		this.state = { };
	}

	render() {
		return (
			<div className='login'>
				Login
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
