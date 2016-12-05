import React, { Component } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import axios from 'axios';

const QuestionListItem = props => (
	<div
		className={classNames('question-list-item', { active: props.active })}
		onClick={props.onClick}>
		<div className='title'>{props.title}</div>
		<div className='date'>{moment.unix(props.created_at).fromNow()}</div>
	</div>
);

export default class QuestionListNavigation extends Component {
	constructor() {
		super();

		this.state = {
			threads: []
		};

		this.onItemClick = this.onItemClick.bind(this);
	}

	componentDidMount() {
		if (!this.props.course_id) return;

		axios.get('/threads', {
			params: {
				course_id: this.props.course_id
			}
		}).then(resp => {
			this.setState({
				threads: resp.data.threads.map(t => ({
					id: t.thread_id,
					created_at: t.created_at,
					title: `Thread: ${t.thread_id}`
				}))
			});
		}).catch(err => {

		});
	}

	onItemClick(threadId) {
		if (this.props.onItemClick) {
			this.props.onItemClick(threadId);
		}
	}

	render() {
		return (
			<div className='question-list-navigation'>
				{this.state.threads.map(thread => (
					<QuestionListItem
						key={thread.id}
						id={thread.id}
						created_at={thread.created_at}
						title={thread.title}
						onClick={() => {this.onItemClick(thread.id);}}
						active={this.props.activeThread === thread.id}
					/>
				))}
			</div>
		);
	}
}
