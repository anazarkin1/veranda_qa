import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ViewContainer from '../ViewContainer';
import QuestionListNavigation from '../components/QuestionListNavigation';
import Thread from '../components/Thread';

class CourseDashboard extends Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		return (
			<div className='dashboard'>
				<div className='left'>
					<QuestionListNavigation />
				</div>
				<div className='right'>
					<Thread />
				</div>
			</div>
		);
	}
}

veranda.onReady(() => {
	ReactDOM.render(
		<ViewContainer><CourseDashboard /></ViewContainer>,
		document.getElementById('root')
	);
});
