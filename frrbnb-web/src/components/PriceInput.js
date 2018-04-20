import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

class PriceInput extends Component {
	render(){
		return (
				<div>
				<TextField
					value={this.props.petPrice}
					onChange={(e, value)=>this.props.handlePetChange(e, this.props.petIndex, value, {petPrice : value})}
					type="number"
					floatingLabelText="Price Per Night ($)"
				/>
				</div>
		);
	}
}

PriceInput.propTypes = {
	petPrice			:	PropTypes.string.isRequired,
	petIndex			:	PropTypes.number.isRequired,
	handlePetChange		:	PropTypes.func.isRequired,
}

export default PriceInput
