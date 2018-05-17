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
	constructor(props, context){
		super(props, context)
		this.state={
			modalOpen: false,
		}

		this.handleModalOpen = this.handleModalOpen.bind(this)
		this.handleModalClose = this.handleModalClose.bind(this)
	}
	
	//get prop to close modal if login succeeds
	
	handleModalOpen(){
		this.setState({
			modalOpen: true,
		});
	}

	handleModalClose(){
		this.setState({
			modalOpen: false,
		});
	}

	render(){
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
					<RaisedButton label="Log In" onClick={this.props.openModal}/>
					<Link to='/help'>
						<RaisedButton label="Help" style={style}/>
					</Link>
				</div>
				<Login 
					open={this.props.open} 
					handleClose={this.props.closeModal}
					handleOpen={this.props.openModal}
					handleLogin={this.props.handleLogin}/>	
			</div>
		)
	}
}

export default Header;
