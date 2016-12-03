import React, {Component} from "react";
import AnswerNew from "./AnswerNew";
import AnswerList from "./AnswerList";

/*
Wrapper around answerNew and answerlist in a thread
*/
export default class AnswersThread extends Component {
   constructor() {
       super();
       this.state = {
           answers: [
               {id: 1, created_at: ((+new Date()) / 1000) - 1000, content: 'Content of ANswer 1', created_by: 'user1'},
               {id: 2, created_at: ((+new Date()) / 1000) - 5000, content: 'Content of Answer 2', created_by: 'user1'},
               {id: 3, created_at: ((+new Date()) / 1000) - 10000, content: 'COntent of Answer 3', created_by: 'user2'}
           ]
       };
       this.onPostSuccess = this.onPostSuccess.bind(this);
   }

   componentDidMount() {
       //TODO:Fetch all answers for this thread and this.setState with them
   }

   onPostSuccess(newPost) {
       //add newPost to the front ofanswersList
       if (Object.keys(newPost).length > 0) {
           let newAnswers = this.state.answers.slice()
           newAnswers.unshift(newPost);
           this.setState({answers: newAnswers});
       } else {
           //TODO: log error?
       }
   }


   render() {
       return (
           <div className='answers'>
               <AnswerNew
                   onPostSuccess={this.onPostSuccess}
               />
               <AnswerList
                   answers={this.state.answers}
               />
           </div>
       );
   }
}
