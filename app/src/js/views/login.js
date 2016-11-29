import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ViewContainer from '../ViewContainer';
import Login_box from '../components/Login_box';

class Login extends Component {
	constructor() {
		super();


	}



	render() {
		return (
			<div className='login box'>
				{'LOGIN'}
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
