import React, { Component } from 'react';
import classNames from 'classnames';

const UpvoteButton = props => (
	<div className={classNames('upvotebutton', {upvoted : props.voted})}>
	   <i className="fa fa-caret-square-o-up"  onClick={() => {
		   if (props.voted) {
			   props.onUnvote();
		   } else {
			   props.onVote();
		   }
	   }} aria-hidden="true"></i>
	</div>
);


export default UpvoteButton;
