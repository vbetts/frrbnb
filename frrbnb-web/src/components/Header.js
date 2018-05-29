import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive';
import Logo from '../resources/images/logo.png';
import {DESKTOP_MIN_WIDTH, MOBILE_MAX_WIDTH} from '../resources/constants.js';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Pets from 'material-ui/svg-icons/action/pets';
import Login from './Login';


const style = {
	margin: 0,
};

const style_logo = {
	margin: 0,
	width: 100
};

const btn_labels = {
	"logged_in"		: {
			"login"  	: "Logout",
			"account"	: "My Profile",
			"booking"	: "My Bookings",
			"about"		: "About",
		},

	"logged_out"	: {
			"login"  	: "Login",
			"account"	: "Create",
			"about"		: "About",
		},
	"about"			: "About"
}


class Header extends Component {

	mobileHeader(){
		const linkto = {
				"account":"/profile/"+this.props.login.loggedInId, 
				"bookings": "/bookings/"+this.props.login.loggedInId,
				"create": "/create",
				"about": "/about"
		}
		const homeLink = (<Link to='/'><Pets color="white" style={{height: 48, lineHeight: 48}}/></Link>)
		const about = (<Link to={linkto.about}><MenuItem primaryText={btn_labels.about}></MenuItem></Link>)

		let login = null
		let account = null
		let bookings = null
		let menu = null
		let booking_alert = this.props.login.bookingChanges ? <Pets color="rgb(0, 188, 212)"/> : null
		if (this.props.login.loggedIn){
			let booking_label = btn_labels.logged_in.booking + booking_alert
			login = (<MenuItem primaryText={btn_labels.logged_in.login} onClick={this.props.handleLogout}></MenuItem>)
			account = (<Link to={linkto.account}><MenuItem primaryText={btn_labels.logged_in.account}></MenuItem></Link>)
			bookings=(<Link to={linkto.bookings}><MenuItem primaryText={booking_label}></MenuItem></Link>)
		} else {
			login = (<MenuItem primaryText={btn_labels.logged_out.login} onClick={this.props.openModal}></MenuItem>)
			account = (<Link to={linkto.create}><MenuItem primaryText={btn_labels.logged_out.account}></MenuItem></Link>)
		}

		menu = (
			<IconMenu
				iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
				anchorOrigin={{horizontal: 'right', vertical: 'top'}}
				targetOrigin={{horizontal: 'right', vertical: 'top'}}
			>
				{account}
				{bookings}
				{login}
				{about}
			</IconMenu>
		)


		return(
			<AppBar 
				title="frrbnb"
				iconElementLeft={homeLink}
				iconElementRight={menu}
			/>
		)
	}

	desktopHeader(){
		let login_btn = null
		let account_btn = null
		let booking_btn = null
		let booking_alert = this.props.login.bookingChanges ? <Pets color="rgb(0, 188, 212)"/> : null
		const linkto = {
				"account":"/profile/"+this.props.login.loggedInId, 
				"bookings": "/bookings/"+this.props.login.loggedInId,
				"create": "/create"
		}

		if (this.props.login.loggedIn){
			login_btn = <RaisedButton label={btn_labels.logged_in.login} onClick={this.props.handleLogout}/>

			account_btn = <Link to={linkto.account}>
						<RaisedButton label={btn_labels.logged_in.account} style={style}/>
					</Link>
			booking_btn = <Link to={linkto.bookings}>
						<RaisedButton label={btn_labels.logged_in.booking} labelPosition="before" icon={booking_alert} style={style}/>
					</Link>
		} else {
			login_btn = <RaisedButton label={btn_labels.logged_out.login} onClick={this.props.openModal}/>
			account_btn = <Link to={linkto.create}>
						<RaisedButton label={btn_labels.logged_out.account} style={style}/>
					</Link>
		}

		return(
			<div className="header">
				<div className="left">
					<Link to='/'>
						<img src={Logo} alt="Logo" style={style_logo}/>
					</Link>
				</div>
				<div className="right">
					{account_btn}
					{booking_btn}
					{login_btn}
					<Link to='/about'>
						<RaisedButton label={btn_labels.about} style={style}/>
					</Link>
				</div>
			</div>
		)
	
	}

	render(){
		let modal = null
		if (!this.props.login.loggedIn){
			modal= <Login 
					open={this.props.open} 
					handleClose={this.props.closeModal}
					handleOpen={this.props.openModal}
					handleLogin={this.props.handleLogin}
					error={this.props.login.errResponse}
					msg={this.props.login.msgResponse}/>	
		}
		return (
			<div>
			<MediaQuery minWidth={DESKTOP_MIN_WIDTH}>
				{this.desktopHeader()}
			</MediaQuery>
			<MediaQuery maxWidth={MOBILE_MAX_WIDTH}>
				{this.mobileHeader()}
			</MediaQuery>
				{modal}
			</div>
		)
	}
}

export default Header;
