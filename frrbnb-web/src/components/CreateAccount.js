import React, { Component } from 'react';
import CreatePet from './CreatePet';
import CitySelect from './CitySelect';
import PropertyTypeSelect from './PropertyTypeSelect';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';

const styles = {
	addBtn: {
		margin: 20
	},
	paper:{
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 20,
		marginBottom: 20,
		marginTop: 20,
	}
}

const REQUIRED_FIELD_MSG = "This field is required"

function createNewPet(){
	return  {
			petPrice				:	"0",
			petCount				:	null,
			petType					:	null,
			petSize					:	null
		}
}
class CreateAccount extends Component {
	constructor (props, context) {
		super(props, context)
		let firstPet = createNewPet()
		this.state = {
			emailAddress			:	"",
			name					:	"",
			password				:	"",
			passwordRetype			:	"",
			selectedCity			:	null,
			selectedPropertyType	:	null,
			createHost				:	false,
			passwordErrMsg			:	"",
			emailRequired			:	REQUIRED_FIELD_MSG,
			nameRequired			:	REQUIRED_FIELD_MSG,
			passwordRequired		:	REQUIRED_FIELD_MSG,
			cityRequired			:	REQUIRED_FIELD_MSG,
			propTypeRequired		:	REQUIRED_FIELD_MSG,
			pets					:	[firstPet,],
		}

		this.handleEmailInput = this.handleEmailInput.bind(this)
		this.handleNameInput = this.handleNameInput.bind(this)
		this.handlePassword = this.handlePassword.bind(this)
		this.handlePasswordRetype = this.handlePasswordRetype.bind(this)
		this.handleCityChange = this.handleCityChange.bind(this)
		this.handlePropertyChange = this.handlePropertyChange.bind(this)
		this.handlePetChange = this.handlePetChange.bind(this)
		this.handleHostToggle = this.handleHostToggle.bind(this)
		this.addPet = this.addPet.bind(this)
		this.removePet = this.removePet.bind(this)
	}

	checkErrMsg = (inputValue) => {
		let errmsg = ""
		if (inputValue === "" || inputValue === null){
			errmsg = REQUIRED_FIELD_MSG
		}
		return errmsg
	}

	handleEmailInput = (event, newValue) => {
		let errmsg = this.checkErrMsg(newValue)
		this.setState({
			emailAddress : newValue,
			emailRequired :	errmsg
		})
	}

	handleNameInput = (event, newValue) => {
		let errmsg = this.checkErrMsg(newValue)
		this.setState({
			name : newValue,
			nameRequired : errmsg
		})
	}

	handlePassword = (event, newValue) => {
		let errmsg = this.checkErrMsg(newValue)
		this.setState({
			passwordRequired : errmsg,
			password : newValue
		})
	}

	handlePasswordRetype = (event, newValue) => {
		if (newValue === this.state.password){
			this.setState({
				passwordRetype : newValue,
				passwordErrMsg : ""
			})
		
		} else {
			this.setState({
				passwordRetype : newValue,
				passwordErrMsg : "Does not match password"
			})
		}
	}

	handleCityChange = (event, key, payload) => {
		let errmsg = this.checkErrMsg(payload)
		this.setState({
			cityRequired : errmsg,
			selectedCity : payload
		})
	}

	handlePropertyChange = (event, key, payload) =>{
		let errmsg = this.checkErrMsg(payload)
		this.setState({
			selectedPropertyType : payload,
			propTypeRequired : errmsg
		})
	}

	handlePetChange = (event, key, payload, update) => {
		let petsArray = this.state.pets.map((pet, index) => {
			if (index === key){
					return Object.assign({}, pet, update)
			} else {
				return pet
			}
		})
		this.setState({
			pets:petsArray
		})
	}

	handleHostToggle = (event, isInputChecked) => {
		this.setState({
			createHost : isInputChecked
		})
	}

	addPet = () => {
		let newPet = createNewPet()
		this.setState({
			pets : [...this.state.pets, newPet]
		})
	}

	removePet = (petIndex)=>{
		let petsArray = this.state.pets.filter((pet, index) => {
			if (index === petIndex){
				return false;
			} else {
				return pet
			}
		})
		this.setState({
			pets:petsArray
		})
	}

	render() {
		let hostFields = null
		if (this.state.createHost){
			let petdata = this.state.pets
			let petJSX = petdata.map((petdata, index) => 
						<div key={index}>
						<Paper style={styles.paper} zDepth={1}>	
							<CreatePet 
									key={index}
									removePet={this.removePet}
									requiresCount={false}
									requiresPriceInput={true}
									petPrice={petdata.petPrice}
									petSize={petdata.petSize}		
									handlePetChange={this.handlePetChange}
									petType={petdata.petType}
									petIndex={index}/>
						</Paper>
							</div>);
			hostFields = <div>
				<PropertyTypeSelect
					errorText={this.state.propTypeRequired}
					handlePropertyChange={this.handlePropertyChange}
					propertyType={this.state.selectedPropertyType}/>
					<h5>Accepted Pets</h5>
					{petJSX}
					<span className="right">
						<FloatingActionButton onClick={this.addPet} style={styles.addBtn}>
				      		<ContentAdd />
				    	</FloatingActionButton>
					</span>
			</div>
		}
		return (
			<form className="createAccountForm">
				<TextField
					floatingLabelText="E-mail Address"
					errorText={this.state.emailRequired}
					name="email"
					value={this.state.emailAddress}
					onChange={(e, value)=>this.handleEmailInput(e, value, "boop")}/>
				<br />
				<TextField
					floatingLabelText="Name"
					errorText={this.state.nameRequired}
					name="name"
					value={this.state.name}
					onChange={this.handleNameInput}/>
				<br />
				<TextField 
					type="password" 
					floatingLabelText="Password"
					errorText={this.state.passwordRequired}
					name="password"
					value={this.state.password}
					onChange={this.handlePassword}/>
				<br />
				<TextField 
					type="password" 
					floatingLabelText="Re-type Password"
					name="passwordRetype"
					errorText={this.state.passwordErrMsg}
					value={this.state.passwordRetype}
					onChange={this.handlePasswordRetype}/>
				<br />
				<CitySelect
					handleCityChange={this.handleCityChange}
					errorText={this.state.cityRequired}
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



