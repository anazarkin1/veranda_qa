import React, { Component } from 'react';

import Question from './Question';
import AnswerList from './AnswerList';

export default class Thread extends Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		return (
			<div className='thread'>
				<Question id={this.props.id} />
				<AnswerList id={this.props.id} />
			</div>
		);
	}
}
