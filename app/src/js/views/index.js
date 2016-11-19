import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
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
		<App />,
		document.getElementById('root')
	);
});