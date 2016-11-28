import React, { Component } from 'react';

const Comment = props => {
    return (
        <div className='comment'>{props.text}</div>
    );
};

export default class Comments extends Component {
	constructor() {
		super();

		this.state = {
            comments: []
        };
	}

    componentDidMount() {
        //TODO: replace dummy data
        this.setState({ comments: [
            { id: 1, text: "Nice question!" },
            { id: 2, text: "I don't understand what you mean." }
        ] });
    }

	render() {
		return (
			<div className='comment-list'>
				{this.state.comments.map(comment => (
                    <Comment
                        key={comment.id}
                        id={comment.id}
                        text={comment.text}
                    />
                ))}
			</div>
		);
	}
}
