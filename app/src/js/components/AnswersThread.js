import React, {Component} from "react";
import AnswerNew from "./AnswerNew";
import AnswerList from "./AnswerList";
import axios from "axios";

/*
 Wrapper around answerNew and answerlist in a thread
 */
export default class AnswersThread extends Component {
    constructor() {
        super();
        this.state = {
            answers: []
        };
        this.onPostSuccess = this.onPostSuccess.bind(this);
    }

    componentDidMount() {
        axios.get('/answers?thread_id=' + this.props.thread_id)
            .then(resp => {
                this.setState({answers: resp.data.answers});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onPostSuccess(newPost) {
        //add newPost to the front ofanswersList
        if (Object.keys(newPost).length > 0) {
            let newAnswers = this.state.answers.slice();
            newAnswers.unshift(newPost);
            this.setState({answers: newAnswers});
        } else {
            //TODO: log error?
        }
    }


    render() {
        return (
            <div className='answers'>
                <AnswerNew
                    onPostSuccess={this.onPostSuccess}
                    thread_id={this.props.thread_id}
                />
                <AnswerList
                    answers={this.state.answers}
                />
            </div>
        );
    }
}
