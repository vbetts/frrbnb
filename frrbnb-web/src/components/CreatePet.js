import React, { Component } from 'react';
import PetCountSelect from './PetCountSelect';
import PetSizeSelect from './PetSizeSelect';
import PetTypeSelect from './PetTypeSelect';
import PriceInput from './PriceInput';
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';

class CreatePet extends Component {
	render(){

		const price = this.props.requiresPriceInput ? 
				<PriceInput 
					petPrice={this.props.petPrice} 
					petIndex={this.props.petIndex}
					handlePetChange={this.props.handlePetChange} /> : null

		const count = this.props.requiresCount ?
					<PetCountSelect
						handlePetChange={this.props.handlePetChange} 
						petIndex={this.props.petIndex}
						petCount={this.props.petCount} /> : null
		return(
			<div key={this.props.petIndex}>
				<span className="right">
					<IconButton 
						iconStyle={{width:24, height:24}}
						style={{width:48, height:48, padding:12}}
						onClick={(e)=>this.props.removePet(this.props.petIndex)}>
						<Delete />
					</IconButton>
				</span>
				{ count }
				<PetTypeSelect
					handlePetChange={this.props.handlePetChange}
					petType={this.props.petType}
					petIndex={this.props.petIndex}/>
				<PetSizeSelect
					handlePetChange={this.props.handlePetChange}
					petSize={this.props.petSize}
					petIndex={this.props.petIndex}/>
				{ price }		
			</div>
		);
	}
}

CreatePet.propTypes = {
	requiresCount			:	PropTypes.bool.isRequired,
	requiresPriceInput		:	PropTypes.bool.isRequired,
	petPrice				:	PropTypes.string,
	petCount				:	PropTypes.number,
	petSize					:	PropTypes.number,
	handlePetChange			:	PropTypes.func.isRequired,
	removePet				:	PropTypes.func.isRequired,
	petType					:	PropTypes.number,
	petIndex				:	PropTypes.number,
}

export default CreatePet
