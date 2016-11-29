import React, { Component } from 'react';
import classNames from 'classnames';

const NavigationButton = props => (
	<div
		className={classNames('navigation-btn', {
			'left': props.left === true,
			'right': props.right === true
		})}
		onClick={props.onClick}
	>{props.label}</div>
);

const NavigationButtonIcon = props => (
	<div
		className={classNames('navigation-btn', 'icon', {
			'left': props.left === true,
			'right': props.right === true
		})}
		title={typeof props.title !== 'undefined' ? props.title : ''}
		onClick={props.onClick}
	>
		<i className={`fa ${props.icon}`}></i>
	</div>
);

const Drawer = props => (
	<div className={classNames('drawer', { open: props.open, closed: !props.open})}>
		<ul>
			<li>CSC309: Programming on the Web</li>
			<li>MGN401: Advanced Wizardry</li>
			<li>HOG105: Intro to Muggle Studies</li>
		</ul>
	</div>
);

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
					<NavigationButtonIcon
						icon='fa-bars'
						left={true}
						onClick={this.toggleDrawer}
					/>
					<NavigationButtonIcon
						icon='fa-sign-out'
						title='Logout'
						left={true}
						onClick={this.logout}
					/>
					<Drawer open={this.state.drawerOpen} />
					<h1
						title={this.state.courseTitle}
						onClick={() => veranda.redirect('/')}
					>{this.state.courseTitle}</h1>
					<NavigationButtonIcon
						icon='fa-gear'
						title='Settings'
						right={true}
						onClick={() => veranda.redirect('/settings')}
					/>
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
