import React, { Component } from 'react';
import classNames from 'classnames';

const NavigationButton = props => (
	<div
		className={classNames('navigation-btn', {
			'left': props.left === true,
			'right': props.right === true
		})}
		onClick={props.onClick}
	>{props.label}</div>
);

class NavigationButtonIcon extends Component {
    constructor() {
        super();
        this.state = { hover: false };

        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
    }

    mouseEnter() {
        this.setState({ hover: true });
    }

    mouseLeave() {
        this.setState({ hover: false });
    }

    render() {
        var icon = this.props.icon;
        if (typeof this.props.hoverIcon !== 'undefined' && this.state.hover) {
            icon = this.props.hoverIcon;
        }

        return (
            <div
                className={classNames('navigation-btn', 'icon', {
                    'left': this.props.left === true,
                    'right': this.props.right === true
                })}
                title={typeof this.props.title !== 'undefined' ? this.props.title : ''}
                onClick={this.props.onClick}
                onMouseEnter={this.mouseEnter}
                onMouseLeave={this.mouseLeave}
            >
                <i className={`fa ${icon}`}></i>
            </div>
        );
    }
}

export { NavigationButton, NavigationButtonIcon };
