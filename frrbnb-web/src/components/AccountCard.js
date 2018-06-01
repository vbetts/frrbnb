import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Image from './Image';
import PropTypes from 'prop-types';
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
		marginBottom: 8
	},
	imgStyle : {
		height: '100%',
	}
};

const DESC_LENGTH = 100

class AccountCard extends Component {
	render(){
		let description = this.props.description

		if (description.length > DESC_LENGTH){
			description = description.slice(0, DESC_LENGTH)
			description += "..."
		}
		return (
		<Link to={"/profile/"+this.props.account_id} >
			<Paper style={style.cardStyle} zDepth={2}>
				<Image 
					altText=""
					imageSrc={this.props.images[0]}
					containerHeight={142}
					containerWidth={284}
					containerStyle={style.imgContainer}
					imageStyle={style.imgStyle} />
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
