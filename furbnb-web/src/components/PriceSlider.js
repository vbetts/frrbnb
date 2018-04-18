import React, { Component } from 'react';
import Slider from 'material-ui/Slider';
import PropTypes from 'prop-types';

class PriceSlider extends Component {
	render(){
		return (
			<span>
				<Slider
					className="priceSlider"
					step={1}
					defaultValue={0}
					value={this.props.petPrice}
					min={this.props.minVal}
					max={this.props.maxVal}
					onChange={this.props.handlePriceChange} 
				/>
				<span className="sliderText">${this.props.petPrice} per night</span>
			</span>
		);
	}
}

PriceSlider.propTypes = {
	petPrice			:	PropTypes.number.isRequired,
	handlePriceChange	:	PropTypes.func.isRequired,
	minVal				:	PropTypes.number.isRequired,
	maxVal				:	PropTypes.number.isRequired
}

export default PriceSlider
