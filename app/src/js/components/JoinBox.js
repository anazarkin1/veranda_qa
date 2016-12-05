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
      courseName: '',
      joinerName: ''
		};

		this.joinCourse = this.joinCourse.bind(this);
    this.onCourseNameChange = this.onCourseNameChange.bind(this);
	}

	joinCourse() {
    alert('joined a course!');
	// 	if (this.value.courseName.length > 0
  //       && this.value.description.length > 0
  //       ) {
	// 		axios.post('/course', {
	// 			course_id: this.value.courseId,
	// 			creater: this.value.creater,
  //       name: this.value.courseName,
  //       description: this.value.description,
  //       start_date: this.value.startDate,
  //       finish_date: this.value.finishDate
	// 		}).then(resp => {
	// 			if (resp.status == 200) {
	// 				veranda.redirect('/login');
	// 			}
	// 		}).catch(err => {
	// 			this.setState({
	// 				error: true,
	// 				errorMessage: err.response.data.error.reason
	// 			});
	// 		});
	// 	} else {
	// 		this.setState({
	// 			error: true,
	// 			errorMessage: 'Please fill in all fields.'
	// 		});
	// 	}
	}



  onCourseNameChange(e) {
		this.value.courseName = e.target.value;
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
      <div className='join-box-container'>
				<header
					className='join-title'
				>
					Create a New Course
				</header>
				<div className='join-box'>
					<div className='form'>
            <div className='form-group'>
              <label className='label'>CourseName:</label>
              <div className='input'>
                <input type='text' placeholder='CSC309'  onChange={this.onCourseNameChange} />
              </div>
            </div>

						<div className='form-group form-actions'>
							<button
								className='btn enter-button right'
								onClick={this.joinCourse}
							>Join</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
