import React, { Component } from 'react';
import axios from 'axios';

export default class ModerationTools extends Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		return (
			<div className='moderationtools'>
			<div className='deletebutton'>
				<i className="fa fa-trash"  onClick={() => {
	            this.props.hideAnswer();
			 }} aria-hidden="true"></i>
			</div>
			</div>
		);
	}
}
