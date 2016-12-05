import React, {Component, PropTypes} from "react";
import RichTextEditor from "react-rte";


export default class RichEditor extends Component {
    constructor(props) {
        super(props);
        let val;
        console.log(this.props.value);
        if (typeof this.props.value !== 'undefined' && this.props.value != '') {
            val = RichTextEditor.createValueFromString(this.props.value, 'html')
        } else {
            val = RichTextEditor.createEmptyValue();
        }

        this.state = {
            value: val
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
                readOnly={typeof this.props.readOnly !== 'undefined' ? this.props.readOnly : false}
            />
        );
    }
}

