import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';

class PetCountSelect extends Component {
	render(){
		return(
			<SelectField
				floatingLabelText="Pet Count"
				onChange={(e, key, payload)=>this.props.handlePetChange(e, this.props.petIndex, payload, {petCount : payload})}
				value={this.props.petCount}>
				<MenuItem value={0} primaryText={0} />
				<MenuItem value={1} primaryText={1} />
				<MenuItem value={2} primaryText={2} />
				<MenuItem value={3} primaryText={3} />
				<MenuItem value={4} primaryText={4} />
				<MenuItem value={5} primaryText={5} />
				<MenuItem value={6} primaryText={6} />
				<MenuItem value={7} primaryText={7} />
				<MenuItem value={8} primaryText={8} />
				<MenuItem value={9} primaryText={9} />
				<MenuItem value={10} primaryText={10} />
			</SelectField>
		);
	}
}

PetCountSelect.propTypes = {
	handlePetChange		:	PropTypes.func.isRequired,
	petCount			:	PropTypes.number,
	petIndex			: PropTypes.number.isRequired
}

export default PetCountSelect
