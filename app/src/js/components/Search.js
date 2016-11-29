import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import { NavigationButtonIcon } from './NavigationControls';

export default class Search extends Component {
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
            <div className='search-container' tabIndex={0}>
                <NavigationButtonIcon
                    icon='fa-search'
                    title='Search'
                    right={true}
                    onClick={this.toggle}
                />
    			<div className={classNames('search', 'input', { open: this.state.open})}>
    				<input type='text' placeholder='Search...' ref='txtSearch' onBlur={this.close} />
    			</div>
            </div>
		);
	}
}
