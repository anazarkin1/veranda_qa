import React, {Component} from "react";
import CommentsThread from "./comments/CommentsThread";
import axios from "axios";
import RichEditor from "./RichEditor";
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
                <div className='title'>{this.props.id} : {this.state.question.title}</div>
                <div className='content'>
                    {this.state.question.content}
                </div>
                <div className='author'>By: {this.state.question.created_by_name || 'Anon.'}</div>
                <CommentsThread
                    thread_id={this.props.id}
                />
            </div>
        );
    }
}
