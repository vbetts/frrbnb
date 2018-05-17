import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';                                  
class App extends Component {
	constructor(props, context){
		super(props, context)
		this.state={
			login	:	{
							loggedIn			:	false,
							loggedInUsername	:	null,
							loggedInId			:	null
						},
			open	:	false
		}

		this.handleLogin = this.handleLogin.bind(this)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
	}

	componentWillMount(){
		//fetch here to check for login state
	}

	openModal(){
		this.setState({
			open	:	true,
		});
	}

	closeModal(){
		this.setState({
			open	:	false,
		});
	}

	handleLogin(event, email, password){
		console.log(email)
		console.log(password)
		this.closeModal()
		//fetch here to log in
	}
	render() {
		let login = this.state.login
		return (
			<MuiThemeProvider>
				<div>
					<Header 
						login={login} 
						handleLogin={this.handleLogin}
						closeModal={this.closeModal}
						openModal={this.openModal}
						open={this.state.open}
					/>
					<Main login={login}/>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
