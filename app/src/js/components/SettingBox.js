import React, { Component } from 'react';
import axios from 'axios';

export default class SettingBox extends Component {
	constructor() {
		super();

    this.state = {
			error: false,
			errorMessage: ''
		};

		this.value = {
      courseName: '',
      joinerName: ''
		};

	}




	render() {
		return (
      <div className='setting-box-container'>
				<header
					className='setting-title'
				>
					Settings Page
				</header>
				<div className='setting-box'>
					<div className='form'>
						<button
							className='btn enter-button'
							onClick={() => veranda.redirect('/joincourse')}
						>Join a Course</button>

            <button
							className='btn enter-button'
							onClick={() => veranda.redirect('/createCourse')}
						>Create a Course</button>

            <button
							className='btn enter-button'
							onClick={() => veranda.redirect('/dashboard')}
						>Back to Dashboard</button>

					</div>


				</div>
			</div>
		);
	}
}
