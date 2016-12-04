import React, {Component} from "react";
import ModerationTools from "../ModerationTools";
import axios from "axios";
import classNames from "classnames";

export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideComment: false
        };
        this.deleteComment = this.deleteComment.bind(this);
    }

    deleteComment() {
        axios.delete('/comment/' + this.props.comment_id).then((resp) => {
            this.setState({
                hideComment: true
            });
        }).catch(function (err) {
            console.log(err);
        });
    }

    render() {
        return (
            <div className={classNames('comment', {hidden: this.state.hideComment})}>
                <div className="createdby">
                    Created by: {this.props.created_by_name}
                </div>
                <br/><br/>
                {this.props.content}
                <br/><br/>
                <br/><br/>
                <ModerationTools
                    comment_id={this.props.comment_id}
                    hideComment={this.deleteComment}
                />
            </div>
        );
    }
}