import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const style = {
	cardStyle : {
		height: 250,
		width: 250,
		margin: 20,
		padding: 20,
		textAlign: 'center',
		display: 'inline-block',
	},
};

class AccountCard extends Component {
	render(){
		return (
		<Link to={"/profile/"+this.props.account_id} >
			<Paper style={style.cardStyle} zDepth={2}>
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
	description		:	PropTypes.string
}

export default AccountCard
