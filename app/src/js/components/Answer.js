import React, {Component} from "react";
import UpvoteButton from "./UpvoteButton";
import CommentsThread from "./comments/CommentsThread";
import ModerationTools from "./ModerationTools";

export default class Answer extends Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        return (
            <div className='answer'>
                <UpvoteButton id={this.props.id}/>Answer {this.props.id}
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
