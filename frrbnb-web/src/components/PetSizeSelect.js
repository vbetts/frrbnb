import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';

class PetSizeSelect extends Component {
	render(){
		return(
			<SelectField
				floatingLabelText="Pet Size"
				onChange={(e, key, payload) => this.props.handlePetChange(e, this.props.petIndex, payload, {petSize : payload})}
				value={this.props.petSize}>
				<MenuItem value={1} primaryText="Small" />
				<MenuItem value={2} primaryText="Medium" />
				<MenuItem value={3} primaryText="Large" />
			</SelectField>
		);
	}
}

PetSizeSelect.propTypes = {
	handlePetChange	:	PropTypes.func.isRequired,
	petIndex			:	PropTypes.number.isRequired,
	petSize				:	PropTypes.number
}

export default PetSizeSelect
