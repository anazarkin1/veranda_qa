import React, {Component} from "react";
import CommentNewControls from "./CommentNewControls";

const InlineEditor = props => (
    <div>

    </div>

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

    onValueChanged(value) {
        //Copy old state, change its value to new val
        let newState = this.state.slice();
        newState.value = value;
        this.setState({newState});
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
                <CommentNewControls
                    onSubmit={this.onSubmit}
                    onIsAnonChanged={this.onIsAnonChanged}
                />
                <InlineEditor/>
            </div>
        );
    }
}
