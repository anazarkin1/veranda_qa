import React, {Component} from "react";
import Question from "./Question";
import AnswerWrapper from "./AnswersThread";

export default class Thread extends Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        return (
            <div className='thread'>
                <Question id={this.props.id}/>
                <AnswerWrapper id={this.props.id}/>
            </div>
        );
    }
}
