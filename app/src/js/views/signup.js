import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ViewContainer from '../ViewContainer';
import SignupBox from '../components/SignupBox';

class Signup extends Component {
	constructor() {
		super();

		this.state = { };
	}

	render() {
		return (
			<div className='signup'>
				<SignupBox

				/>
			</div>
		);
	}
}

veranda.onReady(() => {
	ReactDOM.render(
		<ViewContainer><Signup /></ViewContainer>,
		document.getElementById('root')
	);
});
