import React, { Component } from 'react';
import {FETCH_PATH} from '../config/fetch';
import ResponseMsg from './ResponseMsg';
import BookingForm from './BookingForm';

class Profile extends Component {
	constructor (props, context){
		super(props, context)
		this.state = {
			errResponse			: false,
			msgResponse			: "",
			account_data		: null,
			host_petdata		: null,
			account_petdata		: null,
			account_bookings	: null
		}
	}
	componentDidMount(){
		const account_id = this.props.match.params.account_id

		fetch(FETCH_PATH+"/profile", {
			method: 'POST',
			body: JSON.stringify({"account_id" : account_id}),
			headers: new Headers({'Content-Type':'application/json'})

		})
		.then( res => res.json())
		.then(
			(result) => {
				console.log(result)
			},
			(error) => {
				console.log(error)
			}
		);
	}

	render(){
		return (<div>
				<ResponseMsg error={this.state.errResponse} msg={this.state.msgResponse} />
				<BookingForm />
			</div>);
	}
}

export default Profile
