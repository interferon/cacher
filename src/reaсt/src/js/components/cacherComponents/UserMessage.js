import React from "react";

export default class UserMessage extends React.Component {  
		render() {
			return (
				<p>{this.props.user_msg}</p>
			);
		}
	}