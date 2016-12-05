import React, { Component } from 'react';
import classNames from 'classnames';

import Search from './Search';
import Drawer from './Drawer';

import { NavigationButton, NavigationButtonIcon } from './NavigationControls';

import axios from 'axios';

export default class TopNavigationBar extends Component {
	constructor() {
		super();

		this.state = {
			courseTitle: 'Veranda',
			drawerOpen: false,
			loggedIn: !!window.location.href.match("/dashboard|create/"),
			activeCourse: false,
			courses: []
		};

		this.toggleDrawer = this.toggleDrawer.bind(this);
		this.logout = this.logout.bind(this);
		this.login = this.login.bind(this);
	}

	componentDidMount() {
		if (!window.location.href.match("/dashboard/")) return;

		axios.get('/courses').then(resp => {
			this.setState({
				courses: resp.data.courses.map(t => ({
					id: t.course_id,
					name: t.name
				}))
			}, () => {
				let course = window.location.href.match("[0-9]+$");
		        if (course && course.length > 0) {
		            course = parseInt(course[0]);
		            this.setState({
		                activeCourse: course
		            });
		        }
			});
		}).catch(err => {

		});
	}

	toggleDrawer() {
		this.setState({ drawerOpen: !this.state.drawerOpen });
	}

	logout() {
		veranda.redirect('/logout');
	}

	login() {
		veranda.redirect('/login');
	}

	render() {
		if (this.state.loggedIn) {
			return (
				<header className='top-navigation-bar'>
					<Drawer courses={this.state.courses} />
					<NavigationButtonIcon
	                    icon='fa-sign-out'
	                    title='Logout'
	                    left={true}
	                    onClick={this.logout}
	                />
					<h1
						title={this.state.courseTitle}
						onClick={() => veranda.redirect('/')}
					>{this.state.activeCourse ? (this.state.courses.filter(c => (c.id == this.state.activeCourse)))[0].name : 'Veranda'}</h1>
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

					<h1
						onClick={() => veranda.redirect('/')}
					>Veranda</h1>
					<NavigationButton
						label='Login'
						right={true}
						onClick={() => veranda.redirect('/login')}
					/>
				</header>
			);
		}
	}
}
