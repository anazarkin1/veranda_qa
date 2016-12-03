import React, {Component} from "react";
import CommentNewControls from "./CommentNewControls";

const InlineEditor = props => (
    <input
        className="comment-new-inline-editor"
        type="text"
        onChange={props.onChange}
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
        //TODO: replace dummy ajax result var 'r'
        // TODO:send ajax post and check return value


        let r = {
            id: 99,
            created_at: ((+new Date()) / 1000) - 1000,
            content: 'New Comment 999',
            created_by: 'user999'
        };

        if (true) {
            this.props.onPostSuccess(r);
        }
    }

    render() {
        return (
            <div className='comment-new'>
                <InlineEditor
                    onChange={this.onValueChanged}
                />
                <CommentNewControls
                    onSubmit={this.onSubmit}
                    onIsAnonChanged={this.onIsAnonChanged}
                />
            </div>
        );
    }
}
