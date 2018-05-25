import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';

class PetTypeSelect extends Component {
	render(){
		return(
			<SelectField
				style={this.props.style}
				floatingLabelText="Pet Type"
				onChange={(e, key, payload)=>this.props.handlePetChange(e, this.props.petIndex, payload, {petType : payload})}
				value={this.props.petType}>
				<MenuItem value={0} primaryText="Cat" />
				<MenuItem value={1} primaryText="Small dog (<15kg)" />
				<MenuItem value={2} primaryText="Medium dog (15kg - 30kg)" />
				<MenuItem value={3} primaryText="Large dog (>30kg)" />
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
