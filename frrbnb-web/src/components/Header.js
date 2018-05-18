import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login';
const style = {
	margin: 0,
};

class Header extends Component {
	render(){
		let modal = null
		let login_btn = null
		if (this.props.login.loggedIn){
			login_btn = <RaisedButton label="Log Out" onClick={this.props.handleLogout}/>
		} else {
			login_btn = <RaisedButton label="Log In" onClick={this.props.openModal}/>
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
						<FloatingActionButton style={style}>
							<ActionHome />
						</FloatingActionButton>
					</Link>
				</div>
				<div className="right">
					<Link to='/create'>
						<RaisedButton label="Create Account" style={style}/>
					</Link>
					{login_btn}
					<Link to='/help'>
						<RaisedButton label="Help" style={style}/>
					</Link>
				</div>
				{modal}
			</div>
		)
	}
}

export default Header;
