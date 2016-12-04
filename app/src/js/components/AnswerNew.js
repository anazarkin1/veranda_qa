import React, {Component} from "react";
import RichEditor from "./RichEditor";
import AnswerNewControls from "./AnswerNewControls";
import axios from "axios";


export default class AnswerNew extends Component {
    constructor() {
        super();

        this.state = {
            value: "",
            is_anon: false,
            placeholder: "Entere your answer"
        };
        this.onValueChanged = this.onValueChanged.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onIsAnonChanged = this.onIsAnonChanged.bind(this);
    }

    onValueChanged(value) {
        this.setState({value});
    }

    onIsAnonChanged() {
        this.setState({is_anon: !this.state.is_anon});
    }

    onCancel() {

    }

    onSubmit() {

        var self = this;
        let newAnswer = {
            thread_id: self.props.thread_id,
            content: self.state.value,
            is_anon: self.state.is_anon
        };
        axios.post('/answer', newAnswer)
            .then(function (response) {
                self.setState({value: ""});
                self.props.onPostSuccess(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className='answer-new'>
                <RichEditor
                    onValueChanged={this.onValueChanged}
                    placeholder={this.state.placeholder}
                />
                <AnswerNewControls
                    onSubmit={this.onSubmit}
                    onCancel={this.onCancel}
                    onIsAnonChanged={this.onIsAnonChanged}
                />
            </div>
        );
    }
}
