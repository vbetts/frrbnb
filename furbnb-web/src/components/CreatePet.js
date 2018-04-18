import React, { Component } from 'react';
import PetCountSelect from './PetCountSelect';
import PetSizeSelect from './PetSizeSelect';
import PetTypeSelect from './PetTypeSelect';
import PriceSlider from './PriceSlider';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add'
import PropTypes from 'prop-types'

class CreatePet extends Component {
	render(){

		const priceSlider = this.props.requiresPriceSlider ? 
				<PriceSlider 
					petPrice={this.props.petPrice} 
					minVal={0} 
					maxVal={1000} 
					handlePriceChange={this.props.handlePriceChange} /> : null

		const count = this.props.requiresCount ?
					<PetCountSelect 
						handleCountChange={this.props.handleCountChange} 
						petCount={this.props.petCount} /> : null
		return(
			<div key={this.props.petIndex}>
				{ count }
				<PetTypeSelect
					handlePetChange={this.props.handlePetChange}
					petType={this.props.petType} />
				<PetSizeSelect
					handleSizeChange={this.props.handleSizeChange}
					petSize={this.props.petSize} />
				{ priceSlider }		
				<span><IconButton onClick={this.props.incrementPetIndex}><Add /></IconButton></span>
			</div>
		);
	}
}

CreatePet.propTypes = {
	requiresCount			:	PropTypes.bool.isRequired,
	requiresPriceSlider		:	PropTypes.bool.isRequired,
	handlePriceChange		:	PropTypes.func.isRequired,
	petPrice				:	PropTypes.number.isRequired,
	handleCountChange		:	PropTypes.func.isRequired,
	petCount				:	PropTypes.number,
	handleSizeChange		:	PropTypes.func.isRequired,
	petSize					:	PropTypes.number,
	handlePetChange			:	PropTypes.func.isRequired,
	petType					:	PropTypes.number,
	petIndex				:	PropTypes.number,
	incrementPetIndex		:	PropTypes.func
}

export default CreatePet
