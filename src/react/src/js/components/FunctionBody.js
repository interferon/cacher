import React from "react";

export default class FunctionBody extends React.Component {  
	render() {

			return (
				<div>
					<p>"function (url, post){"</p>
						<textarea id="custom_id_fn" placeholder="Fn's body goes here"></textarea>
					<p>"}"</p>
					<button id="submit_fn">"Submit"</button>
				</div>
			);
		}
	}