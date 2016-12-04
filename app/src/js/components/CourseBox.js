import React, { Component } from 'react';
import axios from 'axios';

export default class CourseBox extends Component {
	constructor() {
		super();

    this.state = {
			error: false,
			errorMessage: ''
		};

		this.value = {
			courseId: '',
			creater: '',
      courseName: '',
      description: '',
      startDate: '',
      finishDate: ''
		};

		this.createCourse = this.createCourse.bind(this);
		this.onCourseIdChange = this.onCourseIdChange.bind(this);
		this.onCreaterChange = this.onCreaterChange.bind(this);
		this.onCourseNameChange = this.onCourseNameChange.bind(this);
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onFinishDateChange = this.onFinishDateChange.bind(this);
	}

	createCourse() {
		if (this.value.courseId.length > 0
        && this.value.creater.length > 0
        && this.value.courseName.length > 0
        && this.value.description.length > 0
        && this.value.startDate.length > 0
        && this.value.finishDate.length > 0) {
			axios.post('/course', {
				course_id: this.value.courseId,
				creater: this.value.creater,
        name: this.value.courseName,
        description: this.value.description,
        start_date: this.value.startDate,
        finish_date: this.value.finishDate
			}).then(resp => {
				if (resp.status == 200) {
					veranda.redirect('/course_dashboard');
				}
			}).catch(err => {
				this.setState({
					error: true,
					errorMessage: err.response.data.error.reason
				});
			});
		} else {
			this.setState({
				error: true,
				errorMessage: 'Please fill in all fields.'
			});
		}
	}

	onCourseIdChange(e) {
		this.value.courseId = e.target.value;
		this.clearError();
	}

	onCreaterChange(e) {
		this.value.creater = e.target.value;
		this.clearError();
	}

  onCourseNameChange(e) {
		this.value.courseName = e.target.value;
		this.clearError();
	}

  onDescriptionChange(e) {
		this.value.description = e.target.value;
		this.clearError();
	}

  onStartDateChange(e) {
		this.value.startDate = e.target.value;
		this.clearError();
	}

  onFinishDateChange(e) {
		this.value.finishDate = e.target.value;
		this.clearError();
	}

  onCreaterChange(e) {
		this.value.creater = e.target.value;
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
      <div className='course-box-container'>
				<header
					className='course-title'
				>
					Create a New Course
				</header>
				<div className='course-box'>
					<div className='form'>
						<div className='form-group'>
							<label className='label'>Id:</label>
							<div className='input'>
								<input type='text' placeholder='CSC309'  onChange={this.onCourseIdChange} />
							</div>
						</div>
						<div className='form-group'>
							<label className='label'>Creater:</label>
							<div className='input'>
								<input type='text' placeholder='Karen Reid'  onChange={this.onCreaterChange} />
							</div>
						</div>
            <div className='form-group'>
              <label className='label'>CourseName:</label>
              <div className='input'>
                <input type='text' placeholder='Programming on the Web'  onChange={this.onCourseNameChange} />
              </div>
            </div>
            <div className='form-group'>
              <label className='label'>Description:</label>
              <div className='input'>
                <input type='text' placeholder='Describe the course briefly '  onChange={this.onDescriptionChange} />
              </div>
            </div>
            <div className='form-group'>
              <label className='label'>StartDate:</label>
              <div className='input'>
                <input type='text' placeholder='Sep 2016'  onChange={this.onStartDateChange} />
              </div>
            </div>
            <div className='form-group'>
              <label className='label'>FinishDate:</label>
              <div className='input'>
                <input type='text' placeholder='Dec 2016'  onChange={this.onFinishDateChange} />
              </div>
            </div>

						<div className='form-group form-actions'>
							<button
								className='btn enter-button right'
								onClick={this.createCourse}
							>Create</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
