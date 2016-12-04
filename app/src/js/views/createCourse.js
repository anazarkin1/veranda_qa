import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ViewContainer from '../ViewContainer';
import CourseBox from '../components/CourseBox';

class CreateCourse extends Component {
	constructor() {
		super();

		this.state = { };
	}

	render() {
		return (
			<div className='createCourse'>
				<CourseBox

				/>
			</div>
		);
	}
}

veranda.onReady(() => {
	ReactDOM.render(
		<ViewContainer><CreateCourse /></ViewContainer>,
		document.getElementById('root')
	);
});
