import React, {Component} from "react";
import Answer from "./Answer";

export default class AnswerList extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className='answer-list'>
                {this.props.answers.map(answer => (
                    <Answer
                        key={answer.answer_id}
                        id={answer.answer_id}
                        thread_id={answer.thread_id}
                        created_by={answer.created_by}
                        created_by_name={answer.created_by_name}
                        is_anon={answer.is_anon}
                        content={answer.content}
                        created_at={answer.created_at}
                        updated_at={answer.updated_at}
                        votes={answer.votes}
                        voted={answer.voted}
                        
                        onVote={() => (this.props.onVote(answer.answer_id))}
                        onUnvote={() => (this.props.onUnvote(answer.answer_id))}
                    />
                ))}
            </div>
        );
    }
}
