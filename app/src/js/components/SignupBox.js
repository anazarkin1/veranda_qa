import React, { Component } from 'react';
import axios from 'axios';

export default class SignupBox extends Component {
	constructor() {
		super();

		this.value = {
			email: '',
			password: '',
			mode: '',
			firstName: '',
			lastName: '',
			univeristy: '',
			faculty: ''
		};

		this.state = {
			mode: 'student',
			error: false,
			errorMessage: ''
		};

		this.switchToStudent = this.switchToStudent.bind(this);
		this.switchToInstructor = this.switchToInstructor.bind(this);

		this.signup = this.signup.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.onNameChange = this.onNameChange.bind(this);
		this.onUniveristyChange = this.onUniveristyChange.bind(this);
		this.clearError = this.clearError.bind(this);
	}

	signup() {
		alert('hi' + this.state.mode);
		if (this.state.mode == 'student') {
			if (this.value.email && this.value.password && this.value.name) {
				axios.post('/account', {
					email: this.value.email,
					password: this.value.password,
					name: this.value.name,
					mode: this.state.mode
				}).then(resp => {
					if (resp.status == 200) {
						veranda.redirect('/login');
					}
				}).catch(err => {
					this.setState({
					error: true,
					errorMessage: err.response.data.error.reason
				});
				});
			}
		}
		else if (this.state.mode == 'instructor') {
			if (this.value.email && this.value.password && this.value.name && this.value.univeristy) {
				axios.post('/account', {
					email: this.value.email,
					password: this.value.password,
					name: this.value.name,
					univerisity: this.value.university,
					mode: this.state.mode
				}).then(resp => {
					if (resp.status == 200) {
						veranda.redirect('/login');
					}
				}).catch(err => {
					console.log('Please check your personal info is filled correctly.')
				});
			}
		} else {
			this.setState({
				error: true,
				errorMessage: err.response.data.error.reason
			});
		}
 	}

	onEmailChange(e) {
		this.value.email = e.target.value;
		this.clearError();
	}

	onPasswordChange(e) {
		this.value.password = e.target.value;
		this.clearError();
	}

	onNameChange(e) {
		this.value.name = e.target.value;
		this.clearError();
	}

	onUniveristyChange(e) {
		this.value.univeristy = e.target.value;
		this.clearError();
	}

	switchToStudent() {
		this.setState({ mode: 'student' });
		this.clearError();
	}

	switchToInstructor() {
		this.setState({ mode: 'instructor' });
		this.clearError();
	}

	clearError() {
		if (this.state.error) {
			this.setState({
				error: false
			});
		}
	}

	render() {
		return (
			<div className='signup-box-container'>

				<header
					className='signup-title'
				>
					Choose a mode to Signup
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

						{ this.state.error && (
							<div className="form__error-wrapper">
								<p className="form__error">
									{this.state.errorMessage}
								</p>
							</div>
						) }

						<div className='form-group'>
							<label className='label'>Email:</label>
							<div className='input'>
								<input type='email' placeholder='Email Address' onChange={this.onEmailChange} />
							</div>
						</div>
						<div className='form-group'>
							<label className='label'>Password:</label>
							<div className='input'>
								<input type='password' placeholder='*****' onChange={this.onPasswordChange} />
							</div>
						</div>
						<div className='form-group'>
							<label className='label'>Name:</label>
							<div className='input'>
								<input type='text' placeholder='Full Name' onChange={this.onNameChange} />
							</div>
						</div>

						{ this.state.mode == 'instructor' && (
							<div>
								<div className='form-group'>
									<label className='label'>University:</label>
									<div className='input'>
										<input type='text' placeholder='University' onChange={this.onUniversityChange} />
									</div>
								</div>
							</div>
						) }

						<div className='form-group form-actions'>
							<button
								className='btn enter-button right'
								onClick={this.signup}
							>Signup</button>
						</div>
					</div>
				</div>
			</div>

		);
	}
}
