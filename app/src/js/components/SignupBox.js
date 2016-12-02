import React, { Component } from 'react';

export default class SignupBox extends Component {
	constructor() {
		super();

		this.state = {
			mode: 'student'
		};

		this.switchToStudent = this.switchToStudent.bind(this);
		this.switchToInstructor = this.switchToInstructor.bind(this);
	}

	switchToStudent() {
		this.setState({ mode: 'student' });
	}

	switchToInstructor() {
		this.setState({ mode: 'instructor' });
	}

	// pressBtn() {
	// 	this.setState({ pressed: true});
	// }

	render() {
		return (
			<div className='signup-box-container'>

				<header
					className='signup-title'
				>
					Signup as
				</header>

				<div className='signup-box'>
					<div className='mode'>
						<button className='btn instructor-button'
							onClick={this.switchToInstructor}
							style={this.state}
						>Instructor</button>
						<button className='btn student-button '
							onClick={this.switchToStudent}
						>Student</button>
					</div>

					<div className='form'>
						<div className='form-group'>
							<label className='label'>Email:</label>
							<div className='input'>
								<input type='email' placeholder='Email Address' />
							</div>
						</div>
						<div className='form-group'>
							<label className='label'>Password:</label>
							<div className='input'>
								<input type='password' placeholder='*****' />
							</div>
						</div>
						<div className='form-group'>
							<label className='label'>First Name:</label>
							<div className='input'>
								<input type='text' placeholder='First Name' />
							</div>
						</div>
						<div className='form-group'>
							<label className='label'>Last name:</label>
							<div className='input'>
								<input type='text' placeholder='Last Name' />
							</div>
						</div>

						{ this.state.mode == 'instructor' && (
							<div className='form-group'>
								<label className='label'>Faculty:</label>
								<div className='input'>
									<input type='text' placeholder='Faculty' />
								</div>
							</div>
						) }

						<div className='form-group form-actions'>
							<button
								className='btn enter-button right'
							>Signup</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
