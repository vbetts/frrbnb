import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';

class PropertyTypeSelect extends Component {
	render(){
		return(
			<SelectField
				style={this.props.style}
				errorText={this.props.errorText}
				floatingLabelText="Property Type"
				onChange={(e, key, payload)=>this.props.handlePropertyChange(e, key, payload, {propertyType : payload})}
				value={this.props.propertyType}>
				<MenuItem value={0} primaryText="Rural" />
				<MenuItem value={1} primaryText="Urban" />
				<MenuItem value={2} primaryText="Suburban" />
			</SelectField>
		);
	}
}

PropertyTypeSelect.propTypes = {
	handlePropertyChange	:	PropTypes.func.isRequired,
	propertyType			:	PropTypes.number
}

export default PropertyTypeSelect
