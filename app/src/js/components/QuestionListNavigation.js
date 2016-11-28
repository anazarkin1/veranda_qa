import React, { Component } from 'react';
import classNames from 'classnames';
import moment from 'moment';

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
		// TODO: Replace Dummy data.
		this.setState({ threads: [
			{ id: 1, created_at: ((+new Date())/1000) - 1000, title: "What is a question?" },
			{ id: 2, created_at: ((+new Date())/1000) - 5000, title: "How can you see in the dark?" },
			{ id: 3, created_at: ((+new Date())/1000) - 10000, title: "What is the meaning of life?" }
		] });
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
