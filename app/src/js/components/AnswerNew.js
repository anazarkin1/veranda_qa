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
       //TODO: replace dummy ajax result var 'r'
       // TODO:send ajax post and check return value


       let r = {
           id: 99,
           created_at: ((+new Date()) / 1000) - 1000,
           content: 'New Answer 1',
           created_by: 'user999'
       };
       if (true) {
           this.props.onPostSuccess(r);
       }
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
