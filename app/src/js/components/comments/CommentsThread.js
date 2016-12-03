import React, {Component} from "react";
import CommentNew from "./CommentNew";
import CommentList from "./CommentList";

/*
 Wrapper around CommentNew and CommentList
 */
export default class CommentsThread extends Component {
    constructor() {
        super();
        this.state = {
            comments: [
                {
                    id: 1,
                    created_at: ((+new Date()) / 1000) - 1000,
                    content: 'Content of comment 1',
                    created_by: 'user1'
                },
                {
                    id: 2,
                    created_at: ((+new Date()) / 1000) - 5000,
                    content: 'Content of comment 2',
                    created_by: 'user1'
                },
                {
                    id: 3,
                    created_at: ((+new Date()) / 1000) - 10000,
                    content: 'COntent of comment 3',
                    created_by: 'user2'
                }
            ]
        };
        this.onPostSuccess = this.onPostSuccess.bind(this);
    }

    componentDidMount() {
        //TODO:Fetch all answers for this thread and this.setState with them
    }

    onPostSuccess(newPost) {
        //add newPost to the front ofanswersList
        if (Object.keys(newPost).length > 0) {
            let newComments = this.state.comments.slice()
            newComments.push(newPost);
            this.setState({comments: newComments});
        } else {
            //TODO: log error?
        }
    }


    render() {
        return (
            <div className='comments'>
                <CommentList
                    comments={this.state.comments}
                />
                <CommentNew
                    onPostSuccess={this.onPostSuccess}
                />
            </div>
        );
    }
}
