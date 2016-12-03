import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ViewContainer from '../ViewContainer';
import QuestionNew from '../components/QuestionNew'

class AskQuestion extends Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		return (
			<div className='askquestion'>
				<QuestionNew/>
			</div>
		);
	}
}

veranda.onReady(() => {
	ReactDOM.render(
		<ViewContainer><AskQuestion /></ViewContainer>,
		document.getElementById('root')
	);
});
