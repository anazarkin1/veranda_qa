import React, { Component } from 'react';
import classNames from 'classnames';

export default class UpvoteButton extends Component {
	constructor() {
		super();

		this.state = {upvoted : 0, voted : false};

    this.upVote = this.upVote.bind(this);
	}

  upVote() {
    ///TODO: Write upvote function

    if (this.state.upvoted == 0) {
      console.log("upvoting");
      this.setState({upvoted : this.state.upvoted + 1, voted : true});
    } else { //answer is already upvoted
      console.log("removing upvote");
      this.setState({upvoted : this.state.upvoted - 1, voted : false});
    }

  }

	render() {
    return (
     <div className={classNames('upvotebutton', {upvoted : this.state.voted})}>
        <i className="fa fa-caret-square-o-up"  onClick={this.upVote} aria-hidden="true"></i>
     </div>
   );
	}



}
