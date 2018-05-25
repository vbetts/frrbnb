import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import DEFAULT_IMG from '../resources/images/default_img.png';
import { Link } from 'react-router-dom';

const style = {
	cardStyle : {
		height: 250,
		width: 250,
		margin: 20,
		padding: 10,
		textAlign: 'center',
		display: 'inline-block',
	},
	imgStyle : {
		height: 100
	}
};

class AccountCard extends Component {
	render(){
		let img_path = DEFAULT_IMG
		if (this.props.images.length > 0){
			img_path = this.props.images[0]
		}
		return (
		<Link to={"/profile/"+this.props.account_id} >
			<Paper style={style.cardStyle} zDepth={2}>
				<img src={img_path} style={style.imgStyle} alt=""/>
				<div>{this.props.name}</div>
				<div className="capitalize city">{this.props.city}</div>
				<div className="capitalize property">{this.props.property_type}</div>
				<div className="description">{this.props.description}</div>	
			</Paper>
		</Link>
		);
	}
}

AccountCard.propTypes = {
	city			:	PropTypes.string.isRequired,
	property_type	:	PropTypes.string.isRequired,
	name			:	PropTypes.string.isRequired,
	account_id		:	PropTypes.number.isRequired,
	description		:	PropTypes.string,
	images			: 	PropTypes.array
}

export default AccountCard
