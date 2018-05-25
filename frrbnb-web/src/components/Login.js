import React, {Component} from 'react';
import ResponseMsg from './ResponseMsg';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';


class Login extends Component {
//Add error message state values
	constructor (props, context){
		super(props, context)
		this.state={
			emailAddress	:	"",
			password		:	"",
		}

		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handlePWChange = this.handlePWChange.bind(this)
	}
	
	handleEmailChange = (event, value) => {
		this.setState({
			emailAddress : value
		})
	}

	handlePWChange = (event, value) => {
		this.setState({
			password : value
		})
	}

	render() {
		const actions = [
			<RaisedButton
			label="Cancel"
			default={true}
			onClick={this.props.handleClose}
			/>,
			<RaisedButton
			label="Submit"
			primary={true}
			onClick={(e)=>this.props.handleLogin(e, this.state.emailAddress, this.state.password)}
			/>,
		];

		return (
			<div>
			<Dialog
				title="Log In"
				actions={actions}
				modal={true}
				open={this.props.open}>
				<div>
					<ResponseMsg error={this.props.error} msg={this.props.msg} />
				</div>
				<TextField 
					floatingLabelText="E-mail Address"
					name="email"
					value={this.state.emailAddress}
					onChange={this.handleEmailChange}/>
				<TextField 
					type="password"
					floatingLabelText="Password"
					name="password"
					value={this.state.password}
					onChange={this.handlePWChange}/>
				
			</Dialog>
			</div>
		);
	}
}

Login.propTypes = {
	open		 :	PropTypes.bool.isRequired,
	handleClose	 :	PropTypes.func.isRequired,
	handleLogin	 :	PropTypes.func.isRequired,
}
export default Login
