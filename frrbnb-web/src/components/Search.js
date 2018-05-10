import React, { Component } from 'react';
import PetTypeSelect from './PetTypeSelect';
import PropertyTypeSelect from './PropertyTypeSelect';
import CitySelect from './CitySelect';
//import PropTypes from 'prop-types'

class Search extends Component {
	render(){
		return(
			<div>
				<PetTypeSelect 
					handlePetChange={this.props.handleSearch} 
					petIndex={0} 
					petType={this.props.petType} />
				<PropertyTypeSelect 
					handlePropertyChange={this.props.handleSearch}
					propertyType={this.props.propertyType} />
				<CitySelect 
					handleCityChange={this.props.handleSearch}
					selectedCity={this.props.selectedCity} />
			</div>
		);
	}
}


export default Search
