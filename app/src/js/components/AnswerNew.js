import React, {Component} from "react";
import classNames from "classnames";
import RichEditor from "./RichEditor";


const AnswerNewButton = props => (
    <div
        className={classNames('answer-new-btn', {
            'left': props.left === true,
            'right': props.right === true
        })}
        onClick={props.onClick}
    >{props.label}</div>
);

export default class AnswerNew extends Component {
    constructor() {
        super();

        this.state = {
            value: ""
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    changeHandler(value) {
        this.setState({value});
    }

    onCancel() {

    }

    onSubmit() {

    }

    render() {
        return (
            <div className='answer-new'>
                <RichEditor
                    changeHandler={this.changeHandler}
                />
                <AnswerNewButton
                    label="Submit"
                    right={true}
                    onClick={this.onSubmit}
                />
                <AnswerNewButton
                    label="Cancel"
                    right={true}
                    onClick={this.onCancel}
                />

            </div>
        );
    }
}
