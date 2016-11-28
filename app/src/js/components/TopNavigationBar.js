import React, { Component } from 'react';

const NavigationButton = props => (
	<div
		className='navigation-btn'
		onClick={props.onClick}
	>{props.label}</div>
);

export default class TopNavigationBar extends Component {
	constructor() {
		super();

		this.state = {
			registered: true
		};

		this.logout = this.logout.bind(this);
	}

	logout() {
		this.setState({
			registered: false
		});
	}

	render() {
		return (
			<nav className='top-navigation-bar'>
				<span>Veranda: Top Navigation Bar</span>
				{ this.state.registered && (
					<NavigationButton
						label="Logout"
						onClick={this.logout}
					/>
				) }
			</nav>
		);
	}
}
