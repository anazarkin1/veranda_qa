import React, { Component } from 'react';
import classNames from 'classnames';

import Search from './Search';
import Drawer from './Drawer';

import { NavigationButton, NavigationButtonIcon } from './NavigationControls';

export default class TopNavigationBar extends Component {
	constructor() {
		super();

		this.state = {
			courseTitle: 'CSC309: Programming on the Web',
			drawerOpen: false,
			loggedIn: true
		};

		this.toggleDrawer = this.toggleDrawer.bind(this);
		this.logout = this.logout.bind(this);
		this.login = this.login.bind(this);
	}

	toggleDrawer() {
		this.setState({ drawerOpen: !this.state.drawerOpen });
	}

	logout() {
		this.setState({
			loggedIn: false
		});
	}

	login() {
		this.setState({
			loggedIn: true
		});
	}

	render() {
		if (this.state.loggedIn) {
			return (
				<header className='top-navigation-bar'>
					<Drawer />
					<NavigationButtonIcon
	                    icon='fa-sign-out'
	                    title='Logout'
	                    left={true}
	                    onClick={this.logout}
	                />
					<h1
						title={this.state.courseTitle}
						onClick={() => veranda.redirect('/')}
					>{this.state.courseTitle}</h1>
					<NavigationButtonIcon
						icon='fa-gear'
						hoverIcon='fa-gear fa-spin'
						title='Settings'
						right={true}
						onClick={() => veranda.redirect('/settings')}
					/>
					<Search />
				</header>
			);
		} else {
			return (
				<header className='top-navigation-bar'>
					<NavigationButton
						label='Signup'
						left={true}
						onClick={() => veranda.redirect('/signup')}
					/>
					<h1
						onClick={() => veranda.redirect('/')}
					>Veranda</h1>
					<NavigationButton
						label='Login'
						right={true}
						onClick={this.login}
					/>
				</header>
			);
		}
	}
}
