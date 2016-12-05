import React, {Component} from "react";
import CommentsThread from "./comments/CommentsThread";
import axios from "axios";
export default class Question extends Component {
    constructor() {
        super();

        this.state = {question: {}};
    }

    componentDidMount() {
        this.updateQuestion();
    }

    updateQuestion() {
        axios.get('/thread?thread_id=' + this.props.id)
            .then(resp => {
                this.setState({question: resp.data});
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    componentWillReceiveProps(next) {
        if (next.id !== this.props.id) {
            this.updateQuestion();
        }
    }


    render() {
        return (
            <div className='question'>
                <div>{this.props.id} : {this.state.question.title}</div>
                <div>{this.state.question.content}</div>
                <div>By: {this.state.question.created_by_name}</div>
                <CommentsThread
                    thread_id={this.props.id}
                />
            </div>
        );
    }
}
