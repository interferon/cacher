import React from "react";

export default class EnableCachingCheckbox extends React.Component {  
	render() {
			let msg = "Use caching for current page";
			return (
				<div>
					<input type="checkbox" id="use_caching">
					<label for='use_caching'>{msg}</label>
				</div>
			);
		}
	}