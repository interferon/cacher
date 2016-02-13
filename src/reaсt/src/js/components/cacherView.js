import React from "react";

import Title from "./cacherComponents/Title";
import Checkbox from "./cacherComponents/Checkbox";
import FnTextArea from "./cacherComponents/FnTextArea";
import SubmitBtn from "./cacherComponents/SubmitBtn";
import UserMessage from "./cacherComponents/UserMessage";

export default class CacherView extends React.Component {
	constructor(){
		super();
		this.state = {
			user_msg : ''
		};
	}
	notifyUser(){
		this.setState({
			user_msg : 'Changes will take effect after page refresh'
		})
	}
	render() {
			return (
				<div>
					<Title title="Extension menu"/>
					<Checkbox notifyUser={this.notifyUser.bind(this)}/>
					<FnTextArea/>
					<SubmitBtn name="Submit" notifyUser={this.notifyUser.bind(this)}/>
					<UserMessage user_msg={this.state.user_msg}/>
				</div>
			);
		}
	}