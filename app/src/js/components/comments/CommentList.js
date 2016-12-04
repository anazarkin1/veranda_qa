import React, {Component} from "react";
import Comment from "./Comment";


export default class CommentsThread extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className='comment-list'>
                {this.props.comments.map(comment => (
                    <Comment
                        key={comment.id}
                        comment_id={comment.id}
                        content={comment.content}
                        created_by={comment.created_by_name}
                    />
                ))}
            </div>
        );
    }
}
