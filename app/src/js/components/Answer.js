import React, {Component} from "react";
import UpvoteButton from "./UpvoteButton";
import CommentsThread from "./comments/CommentsThread";
import ModerationTools from "./ModerationTools";
import axios from 'axios';

export default class Answer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            votes: props.votes,
            voted: props.voted
        };

        this.onVote = this.onVote.bind(this);
        this.onUnvote = this.onUnvote.bind(this);
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

    render() {
        return (
            <div className='answer'>
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
                <br/>
                {this.props.content}
                <br/>
                <div className="timeposted">
                    Time Posted: {this.props.created_at}
                </div>
                <div className="timemodified">
                    Time Modified: {this.props.updated_at}
                </div>
                <br/>
                Comments:<br/>
                <CommentsThread/>
                <ModerationTools/>
            </div>
        );
    }
}
