import React, {Component} from "react";
import CommentNewControls from "./CommentNewControls";
import axios from "axios";

const InlineEditor = props => (
    <input
        className="comment-new-inline-editor"
        type="text"
        onChange={props.onChange}
        placeholder={props.placeholder}
    />
);

export default class CommentNew extends Component {
    constructor() {
        super();

        this.state = {
            value: "",
            is_anon: false
        };
        this.onValueChanged = this.onValueChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onIsAnonChanged = this.onIsAnonChanged.bind(this);
    }

    onValueChanged(evt) {
        let value = evt.target.value;
        this.setState({value});
    }

    onIsAnonChanged() {
        this.setState({is_anon: !this.state.is_anon});
    }

    onSubmit() {
        let newComment = {
            thread_id: this.props.thread_id,
            content: this.state.value,
            is_anon: this.state.is_anon
        };
        if (this.props.answer_id != -1) {
            newComment.answer_id = this.props.answer_id
        }
        axios.post('/comment', newComment)
            .then(function (response) {
                this.props.onPostSuccess(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className='comment-new'>
                <InlineEditor
                    onChange={this.onValueChanged}
                    placeholder="Enter your comment"
                />
                <CommentNewControls
                    onSubmit={this.onSubmit}
                    onIsAnonChanged={this.onIsAnonChanged}
                />
            </div>
        );
    }
}
