import React from "react";

export default class SubmitBtn extends React.Component { 
		handleClick(e){
			this.props.notifyUser();
		} 
		render() {
			return (
				<button id="submit_fn" onClick={this.handleClick.bind(this)}>{this.props.name}</button>	
			);
		}
	}