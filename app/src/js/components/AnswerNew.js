import React, {Component} from "react";
import RichEditor from "./RichEditor";
import AnswerNewControls from "./AnswerNewControls";
import axios from "axios";


export default class AnswerNew extends Component {
   constructor() {
       super();

       this.state = {
           value: "",
           is_anon: false
       };
       this.onValueChanged = this.onValueChanged.bind(this);
       this.onCancel = this.onCancel.bind(this);
       this.onSubmit = this.onSubmit.bind(this);
       this.onIsAnonChanged = this.onIsAnonChanged.bind(this);
   }

   onValueChanged(value) {
       this.setState({value});
   }

   onIsAnonChanged() {
       this.setState({is_anon: !this.state.is_anon});
   }

   onCancel() {

   }

   onSubmit() {

       axios.post('/answer', {
         thread_id: this.props.thread_id,
         content: this.state,
         is_anon: this.props.is_anon
       })
       .then(function (response) {
         this.props.onPostSuccess(response);
       })
       .catch(function (error) {
         console.log(error);
       });
   }

   render() {
       return (
           <div className='answer-new'>
               <RichEditor
                   onValueChanged={this.onValueChanged}
               />
               <AnswerNewControls
                   onSubmit={this.onSubmit}
                   onCancel={this.onCancel}
                   onIsAnonChanged={this.onIsAnonChanged}
               />
           </div>
       );
   }
}
