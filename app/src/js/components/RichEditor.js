import React, {Component, PropTypes} from "react";
import RichTextEditor from "react-rte";


export default class RichEditor extends Component {
    constructor() {
        super();

        this.state = {
            value: RichTextEditor.createEmptyValue()
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        this.setState({value});
        if (this.props.onValueChanged) {
            this.props.onValueChanged(
                value.toString('html')
            );
        }
    };

    render() {
        return (
            <RichTextEditor
                value={this.state.value}
                onChange={this.onChange}
                placeholder={this.props.placeholder}
            />
        );
    }
}

