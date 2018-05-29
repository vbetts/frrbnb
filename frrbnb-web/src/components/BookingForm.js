import React, {Component} from 'react';
import ResponseMsg from './ResponseMsg';
import CreatePet from './CreatePet';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DatePicker from 'material-ui/DatePicker';
import PropTypes from 'prop-types';
import { createNewPet } from './CreateAccount'; 

class BookingForm extends Component {
//Add error message state values
	constructor (props, context){
		super(props, context)
		const firstPet = createNewPet()
		this.state={
			startDate	:	null,
			endDate		:	null,
			pets		:	[firstPet,],
			notes		:	"",
			error		:	false,
			msg			:	"",
			open		:	false
		}

		this.handleClose = this.handleClose.bind(this)
		this.handleOpen = this.handleOpen.bind(this)
		this.handleNotes = this.handleNotes.bind(this)
		this.addPet = this.addPet.bind(this)
		this.removePet = this.removePet.bind(this)
		this.handlePetChange = this.handlePetChange.bind(this)
		this.handleDateChange = this.handleDateChange.bind(this)
		this.submitBookingRequest = this.submitBookingRequest.bind(this)
		this.disabledDateCheck = this.disabledDateCheck.bind(this)
	}
	
	handleClose = (e) => {
		this.setState({
			open : false
		})
	}
	handleOpen = (e) => {
		this.setState({
			open : true
		})
	}
	handleNotes = (e, newValue) => {
		this.setState({
			notes : newValue
		})
	}

	handlePetChange = (e, key, payload, update) => {
		console.log(update)
		let petsArray = this.state.pets.map(
			(pet, index) => {
				if (index === key){
					return Object.assign({}, pet, update)
				} else {
					return pet
				}
			})
		this.setState({pets : petsArray})
	}
	submitBookingRequest = (e) => {
		console.log("submit booking")
	}

	addPet = () => {
		let newPet = createNewPet()
		this.setState({
			pets : [...this.state.pets, newPet]
		})
	}

	removePet = (petIndex) => {
		let petsArray = this.state.pets.filter((pet, index)=>{
			if (index === petIndex){ return false } else { return pet }
		})

		this.setState({
			pets: petsArray
		})
	}

	disabledDateCheck = (day) => {
		return Math.random() > 0.7;
	}

	handleDateChange = (e, date, update) => {
		this.setState(update)
	}

	render() {
		const actions = [
			<RaisedButton
			label="Cancel"
			default={true}
			onClick={this.handleClose}
			/>,
			<RaisedButton
			label="Submit"
			primary={true}
			onClick={this.submitBookingRequest}
			/>,
		];

		let petJSX = this.state.pets.map((petdata, index) => 
			<div key={index}>
				<CreatePet
					petIndex={index}
					requiresCount={true} 
					requiresPriceInput={false}
					petCount={petdata.petCount}
					handlePetChange={this.handlePetChange}
					removePet={this.removePet}
					petType={petdata.petType}/>
			</div>
		)


		return (
			<div>
			<RaisedButton
			label="Request Booking"
			primary={true}
			onClick={this.handleOpen}
			/>
			<Dialog
				title="Booking Request"
				actions={actions}
				modal={true}
				open={this.state.open}>
				<div>
					<ResponseMsg error={this.state.error} msg={this.state.msg} />
				</div>
				<DatePicker 
					hintText="Start Date"
					minDate={new Date()}
					value={this.state.startDate}
					shouldDisableDate={this.disabledDateCheck}
					onChange={(e, date) => this.handleDateChange(e, date, {startDate : date})}
				/>
				<DatePicker 
					hintText="End Date"
					minDate={new Date()}
					value={this.state.endDate}
					shouldDisableDate={this.disabledDateCheck}
					onChange={(e, date) => this.handleDateChange(e, date, {endDate : date})}
				/>
				
				{petJSX}
				<span className="right">
					<IconButton onClick={this.addPet}>
						<ContentAdd />
					</IconButton>
				</span>
				<TextField 
					floatingLabelText="Notes"
					name="notes"
					value={this.state.notes}
					onChange={this.handleNotes}/>
				
			</Dialog>
			</div>
		);
	}
}

/*
BookingForm.propTypes = {
	userId		:	PropTypes.number.isRequired,
	hostId	 	:	PropTypes.number.isRequired,
	bookings	:	PropTypes.array
}
*/
export default BookingForm
