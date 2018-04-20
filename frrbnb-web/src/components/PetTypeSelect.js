import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';

class PetTypeSelect extends Component {
	render(){
		return(
			<SelectField
				floatingLabelText="Pet Type"
				onChange={(e, key, payload)=>this.props.handlePetChange(e, this.props.petIndex, payload, {petType : payload})}
				value={this.props.petType}>
				<MenuItem value={0} primaryText="Cat" />
				<MenuItem value={1} primaryText="Dog" />
			</SelectField>
		);
	}
}

PetTypeSelect.propTypes = {
	handlePetChange		:	PropTypes.func.isRequired,
	petIndex			:	PropTypes.number.isRequired,
	petType				:	PropTypes.number
}

export default PetTypeSelect
