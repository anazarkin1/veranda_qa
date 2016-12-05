import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ViewContainer from '../ViewContainer';

class Homepage extends Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		return (
			<div className='home'>
				<div className='home-container'>
					<header
						className='home-title'
					>
						Welcome to Veranda !
					</header>
					<div className='home-box'>
							<div className='startAsStudent'>
								<header
									className='student-title'
								>
									Student
									<button className='btn start-button'
										onClick={() => veranda.redirect('/login')}
									>Get Started</button>
								</header>
								<div className='student-box'>
									<div className='form'>
									
									</div>
								</div>
							</div>
							<div className='startAsInstructor'>
								<header
									className='instructor-title'
								>
									Instructor
									<button className='btn start-button'
										onClick={() => veranda.redirect('/login')}
									>Get Started</button>
								</header>
								<div className='instructor-box'>
									<div className='form'>

									</div>
								</div>
							</div>
					</div>
				</div>
			</div>
		);
	}
}

veranda.onReady(() => {
	ReactDOM.render(
		<ViewContainer><Homepage /></ViewContainer>,
		document.getElementById('root')
	);
});
