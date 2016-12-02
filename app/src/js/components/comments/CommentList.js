import React, {Component} from "react";

const Comment = props => {
    return (
        <div className='comment'>{props.text}</div>
    );
};

export default class CommentsThread extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        //TODO: replace dummy data
    }

    render() {
        return (
            <div className='comment-list'>
                {this.props.comments.map(comment => (
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
