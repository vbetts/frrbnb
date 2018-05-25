import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import DEFAULT_IMG from '../resources/images/default_img.png';
import { Link } from 'react-router-dom';

const style = {
	cardStyle : {
		height: 300,
		width: 300,
		margin: 20,
		padding: 8,
		textAlign: 'center',
		display: 'inline-block',
		overflow: 'hidden'
	},
	imgContainer: {
		backgroundColor: 'rgba(0, 188, 212, 0.1)',
		border: '1px solid rgb(219, 219, 211)', 
		width: 284,
		height: 142,
		overflow: 'scroll',
		marginBottom: 8
	},
	imgStyle : {
		height: 142,
	}
};

const DESC_LENGTH = 150

class AccountCard extends Component {
	render(){
		let img_path = DEFAULT_IMG
		if (this.props.images.length > 0){
			img_path = this.props.images[0]
		}
		let description = this.props.description

		if (description.length > DESC_LENGTH){
			description = description.slice(0, DESC_LENGTH)
			description += "..."
		}
		return (
		<Link to={"/profile/"+this.props.account_id} >
			<Paper style={style.cardStyle} zDepth={2}>
				<div className="center" style={style.imgContainer}>
					<img src={img_path} style={style.imgStyle} alt=""/>
				</div>
				<div className="cardHeader">
					<div className="name">{this.props.name}</div>
					<div>
						<span className="capitalize property">{this.props.property_type} {this.props.city}</span>
					</div>
				</div>
				<div className="description" title={this.props.description}>{description}</div>	
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
