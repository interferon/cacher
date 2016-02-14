import React from "react";

export default class UserMessage extends React.Component {  
		render() {
			return (
				<div>
					<p id="user_msg">{this.props.user_msg}</p>
				</div>
			);
		}
	}