import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ViewContainer from '../ViewContainer';

class Homepage extends Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		return (
			<div>{'Welcome'}</div>
		);
	}
}

veranda.onReady(() => {
	ReactDOM.render(
		<ViewContainer><Homepage /></ViewContainer>,
		document.getElementById('root')
	);
});
