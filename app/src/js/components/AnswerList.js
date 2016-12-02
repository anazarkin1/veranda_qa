import React, {Component} from "react";
import Answer from "./Answer";

export default class AnswerList extends Component {
    constructor() {
        super();
    }


    componentDidMount() {
        // TODO: Replace Dummy data.
    }

    render() {
        return (
            <div className='answer-list'>
                {this.props.answers.map(answer => (
                    <Answer
                        key={answer.id}
                        id={answer.id}
                    />
                ))}
            </div>
        );
    }
}
