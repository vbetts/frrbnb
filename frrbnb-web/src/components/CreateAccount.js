import React, { Component } from 'react';
import CreatePet from './CreatePet';
import CitySelect from './CitySelect';
import PropertyTypeSelect from './PropertyTypeSelect';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

const styles = {
	addBtn: {
		width: 72,
		height: 72,
		padding: 16
	},
	addBtnIcon : {
		width: 36,
		height: 36
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
			description				: 	"",
			passwordErrMsg			:	"",
			errResponse				:	false,
			msgResponse				:	"",
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

	handleDescInput = (event, newValue) => {
		this.setState({
			description : newValue
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

	validateRequiredFields = () => {
			let errMsg = []
			if (this.state.emailAddress === ""){
				errMsg.push("'Email address' is a required field")
			}
			if (this.state.name === ""){
				errMsg.push("'Name' is a required field")	
			}
			if (this.state.password === ""){
				errMsg.push("'Password' is a required field")	
			}
			if (this.state.selectedCity === null){
				errMsg.push("'City' is a required field")	
			}
			if (this.state.passwordErrMsg !== ""){
				errMsg.push("Password fields do not match")
			}
			if (this.state.createHost && this.state.selectedPropertyType === null){
				errMsg.push("Host accounts must select a property type")	
			}
			if (errMsg.length > 0){
				let msgIntro = "There is a problem with your form: "
				if (errMsg.length > 1){
					msgIntro = "There are problems with your form: "
				}
				let msg = errMsg.map((err, index) => <li key={index}>{err}</li>)
				let retval = <div>{msgIntro}<ul>{msg}</ul></div>					
				this.setState({
					errResponse : true,
					msgResponse : retval,
				})
				return false
			} else {
				this.setState({
					errResponse : false,
					msgResponse : "",
				})
				return true
			}
	}

	submitForm = () => {
			/*
			emailAddress			:	"",
			name					:	"",
			password				:	"",
			passwordRetype			:	"",
			selectedCity			:	null,
			selectedPropertyType	:	null,
			createHost				:	false,
			passwordErrMsg			:	"",
			errResponse				:	false,
			msgResponse				:	"",
			*/
		let formdata = {
			email			:	this.state.emailAddress,
			name			:	this.state.name,
			password		:	this.state.password,
			password_retype	:	this.state.passwordRetype,
			city_id			:	this.state.selectedCity,
			is_host			:	this.state.createHost,
			description		:	this.state.description,
			property_type	:	this.state.selectedPropertyType,
			pets			:	this.state.pets
		}


		fetch("http://127.0.0.1:5000/create", {
			method: 'POST',
			body: JSON.stringify(formdata),
			headers: new Headers({'Content-Type': 'application/json'})
		})
		.then(res => res.json())
		.then(
			(result) => {
				console.log(result)	
			},
			(error) => {
				console.log(error)
			});
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
			hostFields = <div className="header">
				<PropertyTypeSelect
					errorText={this.state.propTypeRequired}
					handlePropertyChange={this.handlePropertyChange}
					propertyType={this.state.selectedPropertyType}/>
					<br />
					<TextField 
						floatingLabelText="Property Description"
						name="description"
						value={this.state.description}
						multiLine={true}
						rows={4}
						rowsMax={10}
						onChange={this.handleDescInput}/>
					<br />
					<h5>Accepted Pets</h5>
					{petJSX}
					<span className="right">
						<IconButton onClick={this.addPet} style={styles.addBtn} iconStyle={styles.addBtnIcon}>
				      		<ContentAdd />
				    	</IconButton>
					</span>
			</div>
		}
		const spanClass = this.state.errResponse ? "errorMsg" : "successMsg"
		return (
			<div>
			<span className={spanClass}>{this.state.msgResponse}</span>
			<form className="createAccountForm" 
					onSubmit={e => {
						e.preventDefault()
						let validate = this.validateRequiredFields()
						if (validate){
							this.submitForm()
						} else {
							return;
						}
					}}>
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
				<div style={{marginTop: 20, paddingBottom: 50}}>
				<RaisedButton primary={true} className="right" type="submit" label="submit" />
				</div>
			</form>
			</div>
		);
	}
}


 
export default CreateAccount



