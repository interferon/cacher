import React from "react";

export default class UserMessage extends React.Component {  
		render() {
			return (
				<div>
					<p>{this.props.user_msg}</p>
				</div>
			);
		}
	}