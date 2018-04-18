import React, { Component } from 'react';
import CreatePet from './CreatePet';
import CitySelect from './CitySelect';
import PropertyTypeSelect from './PropertyTypeSelect';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';


class CreateAccount extends Component {
	constructor (props, context) {
		super(props, context)
		this.state = {
			emailAddress			:	"",
			name					:	"",
			password				:	"",
			passwordRetype			:	"",
			selectedCity			:	null,
			selectedPropertyType	:	null,
			createHost				:	false,
			petPrice				:	0,
			petIndex				:	0,
			petCount				:	null,
			petType					:	null,
			petSize					:	null
		}
	}

	handleCityChange = (event, key, payload) => {
		this.setState({
			selectedCity : payload
		})
	}
	handlePropertyChange = (event, key, payload) =>{
		this.setState({
			selectedPropertyType : payload
		})
	}
	handleCountChange = (event, key, payload) => {
		this.setState({
			petCount : payload
		})
	}
	handlePetChange = (event, key, payload) => {
		this.setState({
			petType : payload
		})
	}
	handleSizeChange = (event, key, payload) => {
		this.setState({
			petSize : payload
		})
	}
	handlePriceChange = (event, value) => {
		this.setState({
			petPrice : value
		})
	}
	incrementPetIndex = () => {
		this.setState({
			petIndex : this.state.petIndex+1
		})
	}

	handleHostToggle = (event, isInputChecked) => {
		this.setState({
			createHost : isInputChecked
		})
	
	}

	handleEmailInput = (event, newValue) => {
		this.setState({
			emailAddress : newValue
		})
	}
	handleNameInput = (event, newValue) => {
		this.setState({
			name : newValue
		})
	}
	handlePassword = (event, newValue) => {
		this.setState({
			password : newValue
		})
	}
	handlePasswordRetype = (event, newValue) => {
		this.setState({
			passwordRetype : newValue
		})
	}

	render() {

		const hostFields = this.state.createHost ?
			<div>
				<PropertyTypeSelect
					handlePropertyChange={this.handlePropertyChange}
					propertyType={this.state.selectedPropertyType}/>
				<CreatePet 
					requiresCount={false}
					requiresPriceSlider={true}
					handlePriceChange={this.handlePriceChange}
					petPrice={this.state.petPrice}
					handleCountChange={this.handleCountChange}
					petCount={this.state.petCount}
					handleSizeChange={this.handleSizeChange}
					petSize={this.state.petSize}
					handlePetChange={this.handlePetChange}
					petType={this.state.petType}
					petIndex={this.state.petIndex}
					incrementPetIndex={this.incrementPetIndex}/>
			</div> :
			null
		return (
			<form>
				<TextField
					floatingLabelText="E-mail Address"
					name="email"
					value={this.state.emailAddress}
					onChange={this.handleEmailInput}/>
				<br />
				<TextField
					floatingLabelText="Name"
					name="name"
					value={this.state.name}
					onChange={this.handleNameInput}/>
				<br />
				<TextField 
					type="password" 
					floatingLabelText="Password"
					name="password"
					value={this.state.password}
					onChange={this.handlePassword}/>
				<br />
				<TextField 
					type="password" 
					floatingLabelText="Re-type Password"
					name="passwordRetype"
					value={this.state.passwordRetype}
					onChange={this.handlePasswordRetype}/>
				<br />
				<CitySelect
					handleCityChange={this.handleCityChange}
					selectedCity={this.state.selectedCity}/>
				<br />
				<Toggle 
					label="Create Host Account"
					toggled={this.state.createHost}
					onToggle={this.handleHostToggle}/>

				{ hostFields }
			</form>
		);
	}
}


 
export default CreateAccount



