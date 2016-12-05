import React, {Component} from "react";
import Question from "./Question";
import AnswersThread from "./AnswersThread";

export default class Thread extends Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        return (
            <div className='thread'>
                <Question
                    id={this.props.id}
                />
                <AnswersThread
                    thread_id={this.props.id}
                />
            </div>
        );
    }
}
