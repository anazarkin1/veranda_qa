import React, {Component} from "react";
import ReactDOM from "react-dom";
import ViewContainer from "../ViewContainer";
import QuestionListNavigation from "../components/QuestionListNavigation";
import Thread from "../components/Thread";
class CourseDashboard extends Component {
    constructor() {
        super();

        let course = window.location.href.match("[0-9]+$");
        if (course && course.length > 0) {
            course = parseInt(course[0]);
        }

        this.state = {
            activeThread: 1,
            activeCourse: course || false
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
                        course_id={this.state.activeCourse}
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
