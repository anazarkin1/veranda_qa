import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ViewContainer from '../ViewContainer';
import JoinBox from '../components/JoinBox';

class JoinCourse extends Component {
	constructor() {
		super();

		this.state = { };
	}

	render() {
		return (
			<div className='joinCourse'>
				<JoinBox

				/>
			</div>
		);
	}
}

veranda.onReady(() => {
	ReactDOM.render(
		<ViewContainer><JoinCourse /></ViewContainer>,
		document.getElementById('root')
	);
});
