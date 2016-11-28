import React, { Component } from 'react';

export default class Answer extends Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		return (
			<div className='answer'>
				Answer {this.props.id}
			</div>
		);
	}
}
