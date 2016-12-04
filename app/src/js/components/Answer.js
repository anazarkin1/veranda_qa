import React, {Component} from "react";
import UpvoteButton from "./UpvoteButton";
import CommentsThread from "./comments/CommentsThread";
import ModerationTools from "./ModerationTools";
import axios from 'axios';
import classNames from 'classnames';

export default class Answer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            votes: props.votes,
            voted: props.voted,
            hideAnswer : false
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
            hideAnswer : true
          });
        }).catch(function (err) {
          console.log(err);
        });
    }

    render() {
        return (
            <div className={classNames('answer', {hidden : this.state.hideAnswer})}>
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
                {this.props.content}
                <br/><br/>
                <div className="timeposted">
                    Time Posted: {this.props.created_at}
                </div>
                <div className="timemodified">
                    Time Modified: {this.props.updated_at}
                </div>
                <br/><br/>
                Comments:<br/>
                <CommentsThread/>
                <ModerationTools
                answer_id={this.props.id}
                hideAnswer={this.deleteAnswer}
                />
            </div>
        );
    }
}
