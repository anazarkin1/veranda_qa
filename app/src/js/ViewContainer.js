import React, { Component } from 'react';

import TopNavigationBar from './components/TopNavigationBar';

export default class ViewContainer extends Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		return (
			<div className='view-container'>
				<TopNavigationBar />
				<div className='view'>
					{this.props.children}
				</div>
			</div>
		);
	}
}
