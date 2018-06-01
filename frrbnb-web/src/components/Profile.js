import React, { Component } from 'react';
import {FETCH_PATH} from '../config/fetch';
import ResponseMsg from './ResponseMsg';
import BookingForm from './BookingForm';
import Image from './Image';

class Profile extends Component {
	constructor (props, context){
		super(props, context)
		this.state = {
			errResponse			: false,
			msgResponse			: "",
			account_data		: {
				city: "",
				city_id: 0,
				description: "",
				email: "",
				id: 0,
				images: [],
				is_host: 0,
				last_login: 0,
				lat: null,
				lon: null,
				name: "",
				password: "",
				property_type: "",
				suspended: 0	
			},
			bookings			: [],
			host_pets			: null,
			account_pets		: null,
			account_bookings	: null,
			account_reviews		: [],
			loggedInId			: null
		}
	}
	componentWillMount(){
		const account_id = this.props.match.params.account_id

		fetch(FETCH_PATH+"/profile", {
			method: 'POST',
			body: JSON.stringify({"account_id" : account_id}),
			headers: new Headers({'Content-Type':'application/json'})

		})
		.then( res => res.json())
		.then(
			(result) => {
				this.setState(result)
			},
			(error) => {
			}
		);
	}

	render(){
		let bookingform = null
		if (this.state.account_data.is_host === 1){ 
			let disabled = false
			if (this.state.loggedInId === null){
				disabled = true
			}
			bookingform = <BookingForm 
							disabled={disabled}
							userId={this.state.loggedInId}
							hostId={this.state.account_data.id}
							bookings={this.state.bookings}/>
		}
		return (<div>
				<ResponseMsg error={this.state.errResponse} msg={this.state.msgResponse} />
				<div>
					<Image 
						altText=""
						imageSrc={this.state.account_data.images[0]}
						containerHeight={300}
						containerWidth="100%"
						containerStyle={{display:"block"}}
						imageStyle={{display:"block", margin:"0 auto"}}
					/>
				</div>
				<h1 className="name" style={{fontSize: 40}}>{this.state.account_data.name}</h1>
				<span className="capitalize property" style={{fontSize: 20}} >{this.state.account_data.property_type} property in {this.state.account_data.city}</span>
				<div className="description">{this.state.account_data.description}</div>
				<div className="right">
				{bookingform}
				</div>
			</div>);
	}
}

export default Profile
