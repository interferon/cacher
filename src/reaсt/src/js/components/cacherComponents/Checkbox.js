import React from "react";

export default class Checkbox extends React.Component {
		handleClick(e){
			this.props.notifyUser();
		}   
		render() {
			let label = 'Use caching for current page'
			return (
				<div>
					<input type="checkbox" id="use_caching" onClick={this.handleClick.bind(this)}></input>
					{label}
				</div>
			);
		}
	}