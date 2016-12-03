import React, { Component } from 'react';

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
			mode: 'student'
		};

		this.switchToStudent = this.switchToStudent.bind(this);
		this.switchToInstructor = this.switchToInstructor.bind(this);

		this.signup = this.signup.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.onFirstNameChange = this.onFirstNameChange.bind(this);
		this.onLastNameChange = this.onLastNameChange.bind(this);
		this.onUniveristyChange = this.onUniveristyChange.bind(this);
		this.onFacultyChange = this.onFacultyChange.bind(this);
	}

	signup() {
		if (this.value.mode == 'student') {
			if (this.value.email && this.value.password && this.value.firstName && this.value.lastName) {
				axios.post('/account', {
					email: this.value.email,
					password: this.value.password,
					firstname: this.value.firstName,
					lastname: this.value.lastName,
					mode: this.value.mode
				}).then(resp => {
					if (resp.status == 200) {
						veranda.redirect('/login');
					}
				}).catch(err => {
					console.log('Please check your personal info is filled correctly.')
				});
			}
		}
		else if (this.value.mode == 'instructor') {
			if (this.value.email && this.value.password && this.value.firstName && this.value.lastName && this.value.univeristy && this.value.faculty) {
				axios.post('/account', {
					email: this.value.email,
					password: this.value.password,
					firstname: this.value.firstName,
					lastname: this.value.lastName,
					univerisity: this.value.university,
					faculty: this.value.faculty,
					mode: this.value.mode
				}).then(resp => {
					if (resp.status == 200) {
						veranda.redirect('/login');
					}
				}).catch(err => {
					console.log('Please check your personal info is filled correctly.')
				});
			}
		}
	}

	onEmailChange(e) {
		this.value.email = e.target.value;
	}

	onFirstNameChange(e) {
		this.value.firstName = e.target.value;
	}

	onLastNameChange(e) {
		this.value.lastName = e.target.value;
	}

	onUniveristyChange(e) {
		this.value.univeristy = e.target.value;
	}

	onFacultyChange(e) {
		this.value.faculty = e.target.value;
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
							<label className='label'>First Name:</label>
							<div className='input'>
								<input type='text' placeholder='First Name' onChange={this.onFirstNameChange} />
							</div>
						</div>
						<div className='form-group'>
							<label className='label'>Last name:</label>
							<div className='input'>
								<input type='text' placeholder='Last Name' onChange={this.onLastNameChange} />
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

								<div className='form-group'>
									<label className='label'>Faculty:</label>
									<div className='input'>
										<input type='text' placeholder='Faculty' onChange={this.onFacultyChange} />
									</div>
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
