import React, {Component} from "react";
import UpvoteButton from "./UpvoteButton";
import CommentsThread from "./comments/CommentsThread";
import ModerationTools from "./ModerationTools";
import axios from "axios";
import classNames from "classnames";
import RichEditor from "./RichEditor";

export default class Answer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            votes: props.votes,
            voted: props.voted,
            hideAnswer: false
        };

        this.onVote = this.onVote.bind(this);
        this.onUnvote = this.onUnvote.bind(this);
        this.deleteAnswer = this.deleteAnswer.bind(this);
    }

    onVote() {
        axios.put('/vote', {
            answer_id: this.props.id
        }).then((resp) => {
            this.setState({
                votes: resp.data.votes,
                voted: resp.data.voted
            });
        });
    }

    onUnvote() {
        axios.delete('/vote/answer/' + this.props.id).then((resp) => {
            this.setState({
                votes: resp.data.votes,
                voted: resp.data.voted
            });
        });
    }

    deleteAnswer() {
        axios.delete('/answer/' + this.props.id).then((resp) => {
            this.setState({
                hideAnswer: true
            });
        }).catch(function (err) {
            console.log(err);
        });
    }

    convertUnixTime(unix_timestamp) {
        let dateStr = new Date(unix_timestamp * 1000).toString();

        return dateStr.substr(0, dateStr.length - 15);
    }

    render() {
        return (
            <div className={classNames('answer', {hidden: this.state.hideAnswer})}>
                <div className="votecount">{this.state.votes}</div>
                <UpvoteButton
                    id={this.props.id}
                    voted={this.state.voted}
                    votes={this.state.votes}
                    onVote={this.onVote}
                    onUnvote={this.onUnvote}
                />Answer {this.props.id}
                <div className="createdby">
                    Created by: {this.props.created_by_name}
                </div>
                <br/><br/>
                <RichEditor
                    value={this.props.content}
                    readOnly={true}
                />
                <div className="timeposted">
                    Time Posted: {this.convertUnixTime(this.props.created_at)}
                </div>
                <div className="timemodified">
                    Last Updated: {this.convertUnixTime(this.props.updated_at)}
                </div>
                <br/><br/>
                <CommentsThread
                    thread_id={this.props.thread_id}
                    answer_id={this.props.id}
                />
                <ModerationTools
                    answer_id={this.props.id}
                    hideAnswer={this.deleteAnswer}
                />
            </div>
        );
    }
}
