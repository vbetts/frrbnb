import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResponseMsg extends Component {
	render(){
		let colour = this.props.error ? "errorMsg" : "successMsg"
		return (
			<span className={colour}>{this.props.msg}</span>
		);
	}
}

ResponseMsg.propTypes = {
	error			:	PropTypes.bool
}

export default ResponseMsg
