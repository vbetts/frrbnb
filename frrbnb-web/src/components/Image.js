import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DEFAULT_IMG from '../resources/images/default_img.png';

class Image extends Component {
	render(){
		let containerStyle = { 
			height: this.props.containerHeight,
			width: this.props.containerWidth,
			...this.props.containerStyle
		}

		let imageStyle = {
				height: "100%",
				...this.props.imageStyle
			}

		const style = {
			imgContainer: containerStyle,
			imgStyle : imageStyle
		}

		let img_path = DEFAULT_IMG

		if (typeof this.props.imageSrc !== "undefined" && typeof this.props.imageSrc.img_path !== "undefined"){
			img_path = this.props.imageSrc.img_path
		}

		let classes = this.props.classes ? this.props.classes : "center"
		
		return (
				<div className={classes} style={style.imgContainer}>
					<img src={img_path} style={style.imgStyle} alt={this.props.altText}/>
				</div>
		);
	}
}

Image.propTypes = {
	altText			:	PropTypes.string.isRequired,
	imageSrc		:	PropTypes.object,
	containerHeight	:	PropTypes.oneOfType([
							PropTypes.string,
							PropTypes.number
						]).isRequired,
	containerWidth	:	PropTypes.oneOfType([
							PropTypes.string,
							PropTypes.number
						]).isRequired,
	containerStyle	:	PropTypes.object,
	imageStyle		:	PropTypes.object
}

export default Image
