import React from "react";

export default class FnTextarea extends React.Component {  
		render() {
			let func_start = '(url, post)  =>'
			return (
				<div>
					<p>{func_start}</p>
					<textarea id="custom_id_fn" placeholder="Fn's body goes here"></textarea>
				</div>
			);
		}
	}