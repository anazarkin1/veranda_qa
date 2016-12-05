import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ViewContainer from '../ViewContainer';
import SettingBox from '../components/SettingBox';

class Settings extends Component {
	constructor() {
		super();

		this.state = { };
	}

	render() {
		return (
			<div className='settings'>
				<SettingBox

        />
			</div>
		);
	}
}

veranda.onReady(() => {
	ReactDOM.render(
		<ViewContainer><Settings /></ViewContainer>,
		document.getElementById('root')
	);
});
