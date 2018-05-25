import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Logo from '../resources/images/logo.png';
import RaisedButton from 'material-ui/RaisedButton';
import Pets from 'material-ui/svg-icons/action/pets';
import Login from './Login';
const style = {
	margin: 0,
};

const style_logo = {
	margin: 0,
	width: 100
};

class Header extends Component {
	render(){
		let modal = null
		let login_btn = null
		let account_btn = null
		let booking_btn = null
		let booking_alert = this.props.login.bookingChanges ? <Pets color="rgb(0, 188, 212)"/> : null
		if (this.props.login.loggedIn){
			login_btn = <RaisedButton label="Log Out" onClick={this.props.handleLogout}/>
			let linkto = {
					"profile":"/profile/"+this.props.login.loggedInId, 
					"bookings": "/bookings/"+this.props.login.loggedInId
			}

			account_btn = <Link to={linkto.profile}>
						<RaisedButton label="My Profile" style={style}/>
					</Link>
			booking_btn = <Link to={linkto.bookings}>
						<RaisedButton label="My Bookings" labelPosition="before" icon={booking_alert} style={style}/>
					</Link>
		} else {
			login_btn = <RaisedButton label="Log In" onClick={this.props.openModal}/>
			account_btn = <Link to='/create'>
						<RaisedButton label="Create Account" style={style}/>
					</Link>
			modal= <Login 
					open={this.props.open} 
					handleClose={this.props.closeModal}
					handleOpen={this.props.openModal}
					handleLogin={this.props.handleLogin}/>	
		}
		return (
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
						<RaisedButton label="About" style={style}/>
					</Link>
				</div>
				{modal}
			</div>
		)
	}
}

export default Header;
