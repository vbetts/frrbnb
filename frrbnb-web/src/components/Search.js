import React, { Component } from 'react';
import PetTypeSelect from './PetTypeSelect';
import PropertyTypeSelect from './PropertyTypeSelect';
import CitySelect from './CitySelect';
//import PropTypes from 'prop-types'

const style={
	marginLeft : 12,
	marginRight : 12,
}
class Search extends Component {
	render(){
		return(
			<div>
				<PetTypeSelect 
					style={style}
					handlePetChange={this.props.handleSearch} 
					petIndex={0} 
					petType={this.props.petType} />
				<PropertyTypeSelect 
					style={style}
					handlePropertyChange={this.props.handleSearch}
					propertyType={this.props.propertyType} />
				<CitySelect 
					style={style}
					handleCityChange={this.props.handleSearch}
					selectedCity={this.props.selectedCity} />
			</div>
		);
	}
}


export default Search
