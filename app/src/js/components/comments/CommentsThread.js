import React, {Component} from "react";
import CommentNew from "./CommentNew";
import CommentList from "./CommentList";
import axios from "axios";

/*
 Wrapper around CommentNew and CommentList
 */
export default class CommentsThread extends Component {
    constructor() {
        super();
        this.state = {
            comments: []
        };
        this.onPostSuccess = this.onPostSuccess.bind(this);
    }

    componentDidMount() {
        axios.get('/comments?thread_id=' + this.props.thread_id)
            .then(resp => {
                this.setState({comments: resp.data.comments});
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    onPostSuccess(newPost) {
        //add newPost to the front comment list
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
