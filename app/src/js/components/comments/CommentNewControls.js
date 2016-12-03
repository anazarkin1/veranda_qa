import React, {Component} from "react";
import classNames from "classnames";


const CommentNewButton = props => (
    <div
        className={classNames('comment-new-btn', {
            'left': props.left === true,
            'right': props.right === true
        })}
        onClick={props.onClick}
    >{props.label}</div>
);

export default class CommentNewControls extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onIsAnonChanged = this.onIsAnonChanged.bind(this);
    }

    onSubmit() {
        this.props.onSubmit();
    }

    onIsAnonChanged() {
        this.props.onIsAnonChanged();
    }

    render() {
        return (
            <div className='comment-new-controls'>
                <span>Anonymously?</span>
                <input
                    type="checkbox"
                    onChange={this.onIsAnonChanged}
                />
                <CommentNewButton
                    label="Submit"
                    right={true}
                    onClick={this.onSubmit}
                />
            </div>
        );
    }
}
