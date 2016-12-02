import React, {Component} from "react";
import classNames from "classnames";
import RichEditor from "./RichEditor";


const QuestionNewButton = props => (
    <div
        className={classNames('answer-new-btn', {
            'left': props.left === true,
            'right': props.right === true
        })}
        onClick={props.onClick}
    >{props.label}</div>
);

const QuestionNewTitle = props => (
    <input
        value={value}
        onChange={props.changeHandler}
    />
);
export default class QuestionNew extends Component {
    constructor() {
        super();

        this.state = {
            body: "",
            title: ""
        };
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleBodyChange(value) {
        this.setState({value});
    }

    onCancel() {

    }

    onSubmit() {

    }

    handleTitleChange() {

    }

    render() {
        return (
            <div className='answer-new'>
                <QuestionNewTitle
                    changeHandler={this.handleTitleChange}
                />
                <RichEditor
                    changeHandler={this.handleBodyChange}
                />
                <QuestionNewButton
                    label="Submit"
                    right={true}
                    onClick={this.onSubmit}
                />
                <QuestionNewButton
                    label="Cancel"
                    right={true}
                    onClick={this.onCancel}
                />

            </div>
        );
    }
}
