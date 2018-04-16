import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
	margin: 0,
};

const Header = () => (
	<div className="header">
		<div className="left">
			<Link to='/'>
				<FloatingActionButton style={style}>
					<ActionHome />
				</FloatingActionButton>
			</Link>
		</div>
		<div className="right">
			<Link to='/create'>
				<RaisedButton label="Create Account" style={style}/>
			</Link>
			<Link to='/login'>
				<RaisedButton label="Log In" style={style}/>
			</Link>
			<Link to='/help'>
				<RaisedButton label="Help" style={style}/>
			</Link>
		</div>
	</div>
)

export default Header;
