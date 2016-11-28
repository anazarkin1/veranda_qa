import React, { Component } from 'react';

import Comments from './Comments';

export default class Question extends Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		return (
			<div className='question'>
				<div>Question {this.props.id}</div>
				<Comments questionId={this.props.id} />
			</div>
		);
	}
}
