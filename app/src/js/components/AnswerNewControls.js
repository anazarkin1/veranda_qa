import React, {Component} from "react";
import classNames from "classnames";


const AnswerNewButton = props => (
    <div
        className={classNames('answer-new-btn', {
            'left': props.left === true,
            'right': props.right === true
        })}
        onClick={props.onClick}
    >{props.label}</div>
);

export default class AnswerNewControls extends Component {
    constructor() {
        super();
        this.onCancel = this.onCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onIsAnonChanged = this.onIsAnonChanged.bind(this);
    }

    onCancel() {
        //TODO: make onCancel do something useful
        this.props.onCancel();

    }

    onSubmit() {
        this.props.onSubmit();
    }

    onIsAnonChanged() {
        this.props.onIsAnonChanged();
    }

    render() {
        return (
            <div className='answer-new-controls'>
                <span>Anonymously?</span>
                <input
                    type="checkbox"
                    onChange={this.onIsAnonChanged}
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
