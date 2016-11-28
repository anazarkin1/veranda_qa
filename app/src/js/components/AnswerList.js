import React, { Component } from 'react';

import Answer from './Answer';

export default class AnswerList extends Component {
	constructor() {
		super();

		this.state = {
			answers: []
		};
	}

	componentDidMount() {
		// TODO: Replace Dummy data.
		this.setState({ answers: [
			{ id: 1, created_at: ((+new Date())/1000) - 1000 },
			{ id: 2, created_at: ((+new Date())/1000) - 5000 },
			{ id: 3, created_at: ((+new Date())/1000) - 10000 }
		] });
	}

	render() {
		return (
			<div className='answer-list'>
				{this.state.answers.map(answer => (
					<Answer
						key={answer.id}
						id={answer.id}
					/>
				))}
			</div>
		);
	}
}
