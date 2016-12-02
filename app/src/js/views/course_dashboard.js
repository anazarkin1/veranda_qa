import React, {Component} from "react";
import ReactDOM from "react-dom";
import ViewContainer from "../ViewContainer";
import QuestionListNavigation from "../components/QuestionListNavigation";
import Thread from "../components/Thread";
class CourseDashboard extends Component {
    constructor() {
        super();

        this.state = {
            activeThread: 1
        };

        this.changeThread = this.changeThread.bind(this);
    }

    changeThread(id) {
        this.setState({
            activeThread: id
        });
    }

    render() {
        return (
            <div className='dashboard layout layout-nav-content'>
                <div className='left'>
                    <QuestionListNavigation
                        onItemClick={this.changeThread}
                        activeThread={this.state.activeThread}
                    />
                </div>
                <div className='right'>
                    <Thread
                        id={this.state.activeThread}
                    />
                </div>
            </div>
        );
    }
}

veranda.onReady(() => {
    ReactDOM.render(
        <ViewContainer><CourseDashboard /></ViewContainer>,
        document.getElementById('root')
    );
});
