import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';

class CitySelect extends Component {
	render(){
		return(
			<SelectField
				floatingLabelText="City"
				onChange={(e, key, payload)=>this.props.handleCityChange(e, key, payload, {selectedCity : payload})}
				errorText={this.props.errorText}
				value={this.props.selectedCity}>
				<MenuItem value={0} primaryText="Victoria" />
				<MenuItem value={1} primaryText="Sooke" />
				<MenuItem value={2} primaryText="Nanaimo" />
				<MenuItem value={3} primaryText="Tofino" />
			</SelectField>
		);
	}
}

CitySelect.propTypes = {
	handleCityChange	:	PropTypes.func.isRequired,
	selectedCity		:	PropTypes.number
}

export default CitySelect
