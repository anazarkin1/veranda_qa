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
                    question={this.props.question}
                />
                <AnswersThread
                    thread_id={this.props.id}
                    answers={this.props.answers}
                />
            </div>
        );
    }
}
