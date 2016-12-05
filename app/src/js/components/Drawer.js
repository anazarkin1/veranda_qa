import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import { NavigationButtonIcon } from './NavigationControls';

export default class Drawer extends Component {
	constructor() {
		super();

        this.state = { open: false };

        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
	}

	componentDidUpdate(p, s) {
        if (s.open !== this.state.open && this.state.open) {
            ReactDOM.findDOMNode(this.refs.txtSearch).focus();
        }
	}

    toggle() {
        this.setState({ open: !this.state.open });
    }

    close() {
        this.setState({ open: false });
    }

	render() {
		return (
            <div className='drawer-container' tabIndex={0} onBlur={this.close}>
                <NavigationButtonIcon
                    icon='fa-bars'
                    left={true}
                    onClick={this.toggle}
                />
                <div className={classNames('drawer', { open: this.state.open })}>
                    <ul>
                        {this.props.courses.map(c => (
							<li
								key={c.id}
								onClick={() => {veranda.redirect('/dashboard/'+c.id);}}
							>{c.name}</li>
						))}
                    </ul>
                </div>
            </div>
		);
	}
}
