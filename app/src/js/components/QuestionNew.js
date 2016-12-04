import React, {Component} from "react";
import classNames from "classnames";
import RichEditor from "./RichEditor";
import axios from "axios";


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
      this.setState({body : value});
    }

    handleTitleChange(event) {
      this.setState({title: event.target.value});
    }

    onCancel() {
      //TODO
    }

    onSubmit() {
      axios.post('/question', {
        //TODO: Update with correct question API
        thread_id: this.props.thread_id,
        created_by: this.props.created_by,
        course_id: this.props.course_id,
        is_anon: this.props.is_anon,
        created_at: this.props.created_at,
        updated_at: this.props.updated_at,
        content: this.state
      })
      .then(function (response) {
          //TODO: add some functionality here
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    }

    render() {
        return (
            <div className='answer-new'>
                <QuestionNewTitle
                    changeHandler={this.handleTitleChange}
                />
                <RichEditor
                    onValueChanged={this.handleBodyChange}
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
